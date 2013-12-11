<?php
error_reporting(E_ALL);
require('lib/Slim/Slim.php');
\Slim\Slim::registerAutoloader();
require 'lib/Slim/Middleware.php';


global $ROOT_FOLDER, $DOMAIN;
$ROOT_FOLDER = "galleries/";
$DOMAIN = "http://localhost/gallery/phpbackend/";

$app =  new \Slim\Slim(array(
                'debug' => true,
				'log.enable'=> true,
				'log.path' => 'logs',
				'log.level' => 4,
                'cookies.secret_key'=>'secretty',
                'cookies.lifetime' =>time()	+( 30 * 24 * 60 * 60),
                'cookies.cipher' =>
                 MCRYPT_RIJNDAEL_256,
                'cookies.cipher_mode' => MCRYPT_MODE_CBC			
		));

$app->get('/galleries/', function() use ($app)
    {
        $request = $app->request();
        $response = $app->response();
        $response['Content-Type'] = 'application/json';
        
        $res = array();
        $files = scandir($GLOBALS['ROOT_FOLDER']);
        for ($i = 0; $i < count($files); $i++ ) {
            if($files[$i] != "." and $files[$i] != ".."){
                $res[] = array('name' => $files[$i]);
            }
        }
        $s =  json_encode(array('galleries' => $res));
        echo $s;
    });

$app->get('/galleries/:galleryName/', function($galleryName) use ($app)
    {
        $request = $app->request();
        $response = $app->response();
        $response['Content-Type'] = 'application/json';
        $res = array();
        $info = "";
        $json = "{name: $galleryName, images:[]}";
        $galleryPath = $GLOBALS['ROOT_FOLDER'].$galleryName;
        if (is_dir($galleryPath)) {
            $files = scandir($galleryPath);
            for ($i = 0; $i < count($files); $i++ ) {
            
                if (0 !== strpos($files[$i], 'thumb_')) {
                    if($files[$i] != "." and $files[$i] != ".."){

                        if(!file_exists($galleryPath."/thumb_".$files[$i])){
                            $info = createThumbs($galleryPath."/", 300);
                        }

                        $res[] = array(
                            'filename' => $files[$i],
                            'thumbnail' => 'thumb_'.$files[$i],
                            'path' => $GLOBALS['ROOT_FOLDER'].$galleryName."/",
                            'domain' => $GLOBALS['DOMAIN']
                            );

                    }                     
                }

               
            }
            $json=  json_encode(array('name' => $galleryName, 'images' => $res, 'info' => $info));

        }

        
        echo $json;
    });


function createThumbs( $pathToImages, $thumbWidth )
    {
      // open the directory
      $dir = opendir( $pathToImages );
      $info = "";   
      // loop through it, looking for any/all JPG files:
      while (false !== ($fname = readdir( $dir ))) {

        $img = null;
        // parse path for the extension
        $info = pathinfo($pathToImages . $fname);
        $image_file_types =array('jpg','png', 'gif');
        $filename = pathinfo($pathToImages . $fname, PATHINFO_FILENAME);
        $filenamestart = null;  
        $fileparts = explode('_',$filename, 2);
        if(isset($info['extension'])) {
            $extension = strtolower($info['extension']);}
        if (isset($fileparts[0]))
        {
            $filenamestart = $fileparts[0];
        }
        
        if ( isset($extension) and !is_dir($pathToImages.$fname) and in_array($extension, $image_file_types) )  {
            if (   !file_exists($pathToImages.'thumb_'.$fname) )
            {               
                    //echo $pathToThumbs.'thumb_'.$fname;
                    // continue only if this is a JPEG image
                        
                    switch ($extension) {
                        case 'jpg':
                              // load image and get image size
                            $img = imagecreatefromjpeg( "{$pathToImages}{$fname}" );
                            break;
                        case 'png':
                            $img = imagecreatefrompng( "{$pathToImages}{$fname}" );
                            break;
                        case 'gif':
                            $img = imagecreatefromgif( "{$pathToImages}{$fname}" );
                            break;
                        default:
                            $info."Undefined img: ".$fname." ,";
                            break;
                    }
                
                    if ($img != null) {
  
                        $new_w = $thumbWidth;
                        $new_h = 0;
                 
                        $orig_w = imagesx($img);
                        $orig_h = imagesy($img);
                 
                        $w_ratio = ($orig_h / $orig_w);
                        $h_ratio = ($orig_w / $orig_h);
                 

                        if($orig_w < $thumbWidth or $orig_h < $thumbWidth){
                            $new_w = $orig_w;
                            $new_h = $orig_h;
                        } else {
                            if ($orig_w > $orig_h ) {//landscape from here new
                                $new_w = $thumbWidth;
                                $new_h = $thumbWidth / $h_ratio;                            
                            } elseif ($orig_w < $orig_h ) {//portrait
                                $new_h = $thumbWidth;
                                $new_w = $thumbWidth / $w_ratio;
                            } else {//square
                                $new_w = $thumbWidth;
                                $new_h = $thumbWidth;
                            }
                        }
                      
                      // create a new temporary image
                      $tmp_img = imagecreatetruecolor( $new_w, $new_h);

                      // copy and resize old image into new image 
                      //imagecopyresampled($tmp_img, $img, 0, 0, $src_x, $src_y, $crop_w, $crop_h, $orig_w, $orig_h);
                      imagecopyresized( $tmp_img, $img, 0, 0, 0, 0, $new_w, $new_h, $orig_w, $orig_h );

                      // save thumbnail into a file
                      imagejpeg( $tmp_img, "{$pathToImages}thumb_{$fname}" );
                      
                     // $info."Creating thumb for: ". $pathToImages.$fname." ,";
                  }
            }
            else
            {
               // $info."thumb exists for: ".$fname." ,"; 
                
            }
        }
        else
        {
            //$info."Wrong filetype or directory for thumb: ".$fname." ,";
        }
        
      }
      // close the directory
      closedir( $dir );

      return $info;
    }

// $app->get('/', function() use ($app){
// 	$response = $app->response();
// 	$response['Content-Type'] = 'text/plain';
//     echo "homonaama";  
//     $res[] = array("id"=>1,"title"=>"ss");
// 	echo json_encode($res);
// });


$app->run();

?>




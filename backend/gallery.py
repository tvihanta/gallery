from flask import Flask
import os
from flask import jsonify, abort, render_template
from image_manager import generateThumbsForDir
from flaskCrossdomainDecorator import crossdomain
app = Flask(__name__)

GALLERYFOLDER= 'galleries'
ROOT= '/gallery/'
DOMAIN ="http://192.168.11.8"

@app.route('/')
def index():
	print "index"
	return render_template('index.html')

@app.route('/galleries/')
@crossdomain(origin='*')
def list_galleries():
	returndata = {"galleries": []}
	for dirname, dirnames, filenames in os.walk(GALLERYFOLDER):
	    for subdirname in dirnames:
	        returndata['galleries'].append({
	        	"name": subdirname
	        	})
	  
	print returndata
	return jsonify(returndata)

def walkGallery(path, galleryname):
	thumblessImages = []
	returndata = {"name": galleryname, "images": [] }
	for dirname, dirnames, filenames in os.walk(path):
		for filename in filenames:
			if False == filename.startswith("thumb_"):
				imagePath = os.path.join(dirname, filename)
				thumbPath = os.path.join(dirname, "thumb_"+filename)
				print thumbPath
				if(False == os.path.exists(thumbPath)):
					thumbPath = None
					thumblessImages.append({
						"gallery": os.path.join(GALLERYFOLDER, galleryname),
						"filename" : filename,
						})
					
				returndata['images'].append({
					"filename": filename,
					"thumbnail": "thumb_"+filename,
					"path": "%s/" %os.path.join(ROOT, GALLERYFOLDER, galleryname),
					"domain": DOMAIN
					})

	return [returndata, thumblessImages]


@app.route('/galleries/<galleryname>/')
@crossdomain(origin='*')
def gallery(galleryname):

	path = os.path.join(GALLERYFOLDER, galleryname)	
	if(os.path.exists(path)):
		res = walkGallery(path, galleryname)	
		thumblessImages = res[1]
		print res[1]
		if(len(thumblessImages) > 0):				
			print "generating thumbs..."
			thumbResults = generateThumbsForDir(thumblessImages)
			print thumbResults
			res = walkGallery(path, galleryname)	
			print res

		return jsonify(res[0])
	else:
		abort(404)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=30085)
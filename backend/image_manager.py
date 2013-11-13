from multiprocessing import Pool 
from PIL import Image
import os
def thumbnail(fileData): 

	    try:
	    	path = os.path.join( fileData["gallery"], fileData["filename"] )
	    	print path
	        s = Image.open(path)
	        s.load()
	        s = s.convert('RGB')
	        s.thumbnail([300, 300], Image.ANTIALIAS)
	        s.save(os.path.join( fileData["gallery"], "thumb_%s" %fileData["filename"] ))
	        return 'OK'
	    except Exception as e: 
	    	print e
	        return e 

def generateThumbsForDir(files):
	"""
		generate thumbs
	"""
	pool = Pool(1)
	results = pool.map(thumbnail, files)
	return results

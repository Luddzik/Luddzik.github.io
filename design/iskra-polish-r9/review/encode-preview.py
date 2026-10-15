import sys, glob
sys.path.insert(0,r'D:/Development/GameCompany/Luddzik.github.io/.video-review-tools')
import av
from PIL import Image
files=sorted(glob.glob(r'D:/Development/GameCompany/Luddzik.github.io/design/iskra-polish-r9/previews/motion-frames/*.jpg'))
out=av.open(r'D:/Development/GameCompany/Luddzik.github.io/design/iskra-polish-r9/previews/motion-preview.mp4','w')
stream=out.add_stream('libx264',rate=24);stream.width=1280;stream.height=800;stream.pix_fmt='yuv420p';stream.options={'crf':'20','preset':'medium'}
for f in files:
 frame=av.VideoFrame.from_image(Image.open(f).convert('RGB'))
 for packet in stream.encode(frame):out.mux(packet)
for packet in stream.encode():out.mux(packet)
out.close()
print(len(files),'frames encoded')

import sys, os
sys.path.insert(0, r'D:/Development/GameCompany/Luddzik.github.io/.video-review-tools')
import av
from PIL import Image, ImageDraw
c=av.open(r'C:/Users/luddz/OneDrive/Desktop/Recording 2026-10-15 083942.mp4')
print('duration', c.duration/1000000)
frames=[]
next_t=7.5
for f in c.decode(video=0):
 t=float(f.time)
 if t<next_t: continue
 im=f.to_image(); im.thumbnail((480,270))
 canvas=Image.new('RGB',(480,300),'#151515');canvas.paste(im,(0,0));ImageDraw.Draw(canvas).text((8,278),f'{t:.2f}s',fill='white')
 frames.append(canvas);next_t+=0.3
 if t>=12: break
for start in range(0,len(frames),16):
 sheet=Image.new('RGB',(1920,1200),'#151515')
 for j,im in enumerate(frames[start:start+16]):sheet.paste(im,((j%4)*480,(j//4)*300))
 sheet.save(r'D:/Development/GameCompany/Luddzik.github.io/design/iskra-polish-r9/review/contact-'+str(start//16)+'.jpg')
print('frames',len(frames))

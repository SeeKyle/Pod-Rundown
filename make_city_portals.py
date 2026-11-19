from PIL import Image, ImageDraw
import random
BLK=(4,6,10,255);DK=(10,14,22,255);DK2=(14,22,32,255);W1=(36,44,60,255);W2=(44,50,62,255);W3=(54,62,78,255);W4=(78,90,108,255);W5=(98,110,128,255)
RUST=(118,62,38,255);RUST2=(74,44,34,255);GL=(52,98,142,255);GL2=(70,130,186,255);GLD=(24,44,66,255);BLOOD=(92,18,22,255)
BR=(84,52,44,255);BR2=(62,40,36,255);BR3=(104,66,52,255);STR1=(160,130,40,255);STR2=(30,30,30,255);RED=(120,26,26,255)
def dark_inside(d,box,top_fade=True):
    x0,y0,x1,y1=box
    for y in range(y0,y1+1):
        f=(y-y0)/max(1,(y1-y0))
        c=BLK if f>0.25 else DK
        d.line([(x0,y),(x1,y)],fill=c)
def grime(im,box,rng,n,cols):
    p=im.load();x0,y0,x1,y1=box
    for _ in range(n):
        x=rng.randint(x0,x1);y=rng.randint(y0,y1)
        if p[x,y][3]>0 and sum(p[x,y][:3])>60:p[x,y]=rng.choice(cols)
# ---------- Option A: tenement doorway + broken apartment window ----------
def doorA():
    im=Image.new('RGBA',(24,34),(0,0,0,0));d=ImageDraw.Draw(im);r=random.Random(1)
    d.rectangle([0,2,23,33],fill=W2);d.rectangle([0,0,23,3],fill=W3);d.line([(0,0),(23,0)],fill=W4)   # lintel
    d.rectangle([1,4,22,33],fill=W1);d.line([(1,4),(1,33)],fill=W3);d.line([(22,4),(22,33)],fill=DK2)
    dark_inside(d,(4,6,19,31))
    # door slab swung open inward on the right, in perspective
    d.polygon([(14,7),(19,5),(19,32),(14,30)],fill=W3);d.line([(14,7),(14,30)],fill=W4);d.line([(14,7),(19,5)],fill=W5);d.point((15,19),fill=W5);d.line([(19,5),(19,32)],fill=DK2)
    for y in (12,22):d.point((18,y),fill=RUST)
    d.line([(16,9),(16,14)],fill=RUST2);d.line([(17,18),(17,24)],fill=RUST2)
    # torn paper notice on the frame
    d.rectangle([2,12,3,16],fill=(150,146,128,255));d.point((3,17),fill=(150,146,128,255))
    # step and grime
    d.rectangle([2,32,21,33],fill=W3);d.line([(2,33),(21,33)],fill=W2)
    d.line([(6,26),(5,31)],fill=BLOOD);d.point((7,30),fill=BLOOD)   # a drag mark into the dark
    grime(im,(0,4,23,33),r,40,[W1,DK2,RUST2])
    return im
def winA():
    im=Image.new('RGBA',(26,22),(0,0,0,0));d=ImageDraw.Draw(im);r=random.Random(2)
    d.rectangle([0,0,25,2],fill=W3);d.line([(0,0),(25,0)],fill=W4)      # lintel
    d.rectangle([1,3,24,18],fill=W2);d.rectangle([3,4,22,17],fill=DK2)
    dark_inside(d,(4,5,21,16))
    d.line([(12,5),(12,16)],fill=W1);d.line([(4,10),(21,10)],fill=W1)  # mullions
    # shards still in the frame
    d.polygon([(4,5),(9,5),(4,9)],fill=GLD);d.line([(5,5),(4,7)],fill=GL)
    d.polygon([(21,5),(21,9),(17,5)],fill=GL);d.point((20,6),fill=GL2)
    d.polygon([(13,16),(17,16),(13,13)],fill=GLD);d.polygon([(21,16),(21,12),(19,16)],fill=GL)
    # torn curtain
    d.line([(5,11),(5,16)],fill=(70,40,46,255));d.line([(6,11),(6,14)],fill=(70,40,46,255))
    d.rectangle([0,18,25,19],fill=W4);d.line([(0,20),(25,20)],fill=W2);d.line([(1,21),(24,21)],fill=DK2)   # sill
    d.line([(9,20),(9,21)],fill=RUST2);d.point((15,21),fill=RUST2)
    grime(im,(0,1,25,21),r,24,[W1,DK2])
    return im
# ---------- Option B: steel fire door + barred window ----------
def doorB():
    im=Image.new('RGBA',(24,36),(0,0,0,0));d=ImageDraw.Draw(im);r=random.Random(3)
    d.rectangle([5,0,18,4],fill=DK2);d.rectangle([6,1,17,3],fill=(40,10,12,255))       # dead EXIT sign
    for x in (7,9,11,13,15):d.point((x,2),fill=RED)
    d.rectangle([0,5,23,35],fill=W2);d.line([(0,5),(23,5)],fill=W4);d.line([(0,5),(0,35)],fill=W3)
    d.rectangle([2,7,21,33],fill=DK2);dark_inside(d,(3,8,20,32))
    # steel door kicked half open, hanging off one hinge (tilted)
    d.polygon([(3,8),(10,9),(11,33),(3,32)],fill=W3);d.line([(3,8),(10,9)],fill=W4);d.line([(10,9),(11,33)],fill=W1)
    for (x,y) in ((4,10),(4,30),(9,11),(10,30)):d.point((x,y),fill=W5)   # rivets
    d.line([(5,18),(9,18)],fill=W1);d.point((9,19),fill=W5)               # push bar
    for y in range(12,31,3):d.point((6+(y%2),y),fill=RUST)
    d.line([(7,22),(7,28)],fill=RUST2)
    # hazard stripe at the bottom
    for x in range(2,22):d.point((x,34),fill=STR1 if (x//2)%2==0 else STR2)
    d.line([(2,35),(21,35)],fill=W1)
    # broken chain
    d.point((14,12),fill=W4);d.point((15,13),fill=W5);d.point((15,15),fill=W4);d.point((16,16),fill=W5)
    grime(im,(0,5,23,35),r,30,[W1,DK2,RUST2])
    return im
def winB():
    im=Image.new('RGBA',(26,22),(0,0,0,0));d=ImageDraw.Draw(im);r=random.Random(4)
    d.rectangle([0,0,25,19],fill=W2);d.line([(0,0),(25,0)],fill=W4);d.line([(0,0),(0,19)],fill=W3)
    d.rectangle([2,2,23,17],fill=DK2);dark_inside(d,(3,3,22,16))
    d.polygon([(3,3),(8,3),(3,8)],fill=GLD)
    # bars: one bent out, one snapped
    for x in (6,11,16,21):
        if x==11:
            d.line([(11,2),(11,8)],fill=RUST);d.line([(12,9),(14,12)],fill=RUST)            # snapped and bent
        elif x==16:
            d.line([(16,2),(17,9)],fill=RUST);d.line([(17,9),(16,17)],fill=RUST)            # bowed
        else:d.line([(x,2),(x,17)],fill=RUST);d.point((x,6),fill=(150,84,52,255))
    d.line([(2,2),(23,2)],fill=RUST2);d.line([(2,17),(23,17)],fill=RUST2)
    d.rectangle([0,18,25,19],fill=W4);d.line([(1,20),(24,20)],fill=W2);d.line([(1,21),(24,21)],fill=DK2)
    for x in (6,21):d.line([(x,18),(x,21)],fill=RUST2)   # rust drips
    grime(im,(0,1,25,21),r,20,[W1,DK2])
    return im
# ---------- Option C: hole smashed through brick + blown-out window ----------
def doorC():
    im=Image.new('RGBA',(26,34),(0,0,0,0));d=ImageDraw.Draw(im);r=random.Random(5)
    # irregular brick patch the hole is punched through
    pts=[(2,6),(6,2),(13,0),(20,3),(24,8),(25,20),(24,33),(1,33),(0,20)]
    d.polygon(pts,fill=BR2)
    for y in range(1,34,3):
        off=0 if (y//3)%2 else 2
        for x in range(off,26,5):
            if im.getpixel((x,y))[3]:d.rectangle([x,y,min(25,x+3),y+1],fill=r.choice([BR,BR2,BR3,BR]))
    hole=[(6,9),(9,5),(14,4),(18,7),(20,12),(21,20),(20,31),(5,31),(4,22),(5,14)]
    d.polygon([(x+1,y+1) for x,y in hole],fill=W1)          # broken edge shadow
    d.polygon(hole,fill=DK);d.polygon([(x,y+3) for x,y in hole[1:4]]+[(19,30),(6,30)],fill=BLK)
    for (x,y) in ((7,8),(15,4),(20,13),(5,18)):d.point((x,y),fill=BR3)   # chipped brick bits
    # rubble at the foot
    for (x,y,c) in ((3,32,BR),(4,31,BR3),(8,32,BR2),(17,32,BR),(21,31,BR3),(22,32,BR2),(12,33,W3),(14,32,BR3)):d.point((x,y),fill=c)
    d.line([(1,33),(24,33)],fill=W1)
    d.line([(11,22),(9,30)],fill=BLOOD);d.point((12,26),fill=BLOOD)
    return im
def winC():
    im=Image.new('RGBA',(26,22),(0,0,0,0));d=ImageDraw.Draw(im);r=random.Random(6)
    d.rectangle([0,0,25,19],fill=W2);d.line([(0,0),(25,0)],fill=W3)
    # frame blown out: jagged opening with scorch around it
    hole=[(3,3),(8,2),(14,4),(19,2),(23,4),(22,10),(23,16),(17,17),(10,16),(3,17),(4,10)]
    d.polygon([(x,y) for x,y in hole],fill=(26,24,28,255))
    d.polygon([(x+1 if x<13 else x-1,y+1 if y<10 else y-1) for x,y in hole],fill=DK)
    d.polygon([(6,6),(20,6),(20,15),(6,15)],fill=BLK)
    for (x,y) in ((2,5),(2,12),(24,8),(24,14),(9,1),(16,1),(12,18)):d.point((x,y),fill=(30,28,30,255))  # soot
    d.polygon([(4,4),(7,4),(4,8)],fill=GL);d.point((22,15),fill=GL2);d.polygon([(21,5),(22,5),(22,8)],fill=GLD)
    # curtain blowing out of the hole
    d.line([(20,7),(23,9)],fill=(96,52,58,255));d.line([(20,8),(24,11)],fill=(70,40,46,255));d.point((25,12),fill=(70,40,46,255))
    d.rectangle([0,18,25,19],fill=W4);d.line([(1,20),(24,20)],fill=W2);d.line([(1,21),(24,21)],fill=DK2)
    grime(im,(0,0,25,21),r,18,[W1,DK2])
    return im
for tag,(dr,wn) in {'A':(doorA(),winA()),'B':(doorB(),winB()),'C':(doorC(),winC())}.items():
    dr.save(f'/tmp/dw/door{tag}.png');wn.save(f'/tmp/dw/win{tag}.png')
    print(tag,dr.size,wn.size)

# ---------- 0.12.366 (Kyle's picks): doors A + B reach the ground, window C bigger and at street level ----------
def extend_door(im, add=4):
    w,h=im.size;n=Image.new('RGBA',(w,h+add),(0,0,0,0));n.paste(im.crop((0,0,w,h-2)),(0,0))
    row=im.crop((0,h-4,w,h-3))
    for i in range(add+1):n.paste(row,(0,h-3+i))
    n.paste(im.crop((0,h-2,w,h)),(0,h+add-2));return n
def winC2():
    W,H=34,30;im=Image.new('RGBA',(W,H),(0,0,0,0));d=ImageDraw.Draw(im);r=random.Random(7)
    d.rectangle([0,0,W-1,H-1],fill=W2);d.line([(0,0),(W-1,0)],fill=W3);d.line([(0,0),(0,H-1)],fill=W3);d.line([(W-1,1),(W-1,H-1)],fill=DK2)
    hole=[(3,4),(9,2),(15,4),(21,2),(27,3),(31,6),(30,13),(31,20),(25,22),(16,21),(9,22),(3,21),(4,13)]
    d.polygon(hole,fill=(26,24,28,255))
    d.polygon([(x+1 if x<17 else x-1,y+1 if y<12 else y-1) for x,y in hole],fill=DK)
    d.polygon([(6,6),(28,6),(28,19),(6,19)],fill=BLK)
    for (x,y) in ((2,6),(2,15),(32,9),(32,17),(11,1),(20,1),(15,23),(26,23),(5,23)):d.point((x,y),fill=(30,28,30,255))   # soot
    d.polygon([(4,5),(8,4),(4,10)],fill=GL);d.point((5,6),fill=GL2);d.polygon([(29,18),(29,21),(26,21)],fill=GLD);d.point((27,20),fill=GL2)
    d.polygon([(27,5),(29,5),(29,9)],fill=GLD);d.polygon([(12,21),(15,19),(16,21)],fill=GL)
    # curtain blowing out of the hole
    d.line([(26,8),(30,11)],fill=(96,52,58,255));d.line([(26,9),(31,13)],fill=(70,40,46,255));d.line([(27,11),(32,15)],fill=(96,52,58,255));d.point((33,16),fill=(70,40,46,255))
    # sill, then the low wall down to the sidewalk
    d.rectangle([0,23,W-1,24],fill=W4);d.line([(1,25),(W-2,25)],fill=W2);d.line([(1,26),(W-2,26)],fill=DK2)
    d.rectangle([1,27,W-2,H-1],fill=W1);d.line([(1,H-1),(W-2,H-1)],fill=DK2)
    for x in (8,22):d.line([(x,25),(x,28)],fill=RUST2)
    d.point((14,28),fill=BLOOD);d.point((15,28),fill=BLOOD)
    grime(im,(0,0,W-1,H-1),r,30,[W1,DK2])
    return im
dA=extend_door(doorA());dB=extend_door(doorB());wC=winC2()
dA.save('/tmp/dw/final_doorA.png');dB.save('/tmp/dw/final_doorB.png');wC.save('/tmp/dw/final_winC.png')
print('final',dA.size,dB.size,wC.size)

# ---------- 0.12.367 (Kyle): same hole, wall border cut about in half ----------
def winC3():
    W,H=31,26;im=Image.new('RGBA',(W,H),(0,0,0,0));d=ImageDraw.Draw(im);r=random.Random(7);dx,dy=-2,-1
    S=lambda pts:[(x+dx,y+dy) for x,y in pts]
    d.rectangle([0,0,W-1,H-1],fill=W2);d.line([(0,0),(W-1,0)],fill=W3);d.line([(0,0),(0,H-1)],fill=W3);d.line([(W-1,1),(W-1,H-1)],fill=DK2)
    hole=[(3,4),(9,2),(15,4),(21,2),(27,3),(31,6),(30,13),(31,20),(25,22),(16,21),(9,22),(3,21),(4,13)]
    d.polygon(S(hole),fill=(26,24,28,255))
    d.polygon(S([(x+1 if x<17 else x-1,y+1 if y<12 else y-1) for x,y in hole]),fill=DK)
    d.polygon(S([(6,6),(28,6),(28,19),(6,19)]),fill=BLK)
    for (x,y) in ((0,8),(0,15),(30,9),(30,17),(9,0),(18,0)):d.point((x,y),fill=(30,28,30,255))   # soot
    d.polygon(S([(4,5),(8,4),(4,10)]),fill=GL);d.point((3,5),fill=GL2);d.polygon(S([(29,18),(29,21),(26,21)]),fill=GLD);d.point((25,19),fill=GL2)
    d.polygon(S([(27,5),(29,5),(29,9)]),fill=GLD);d.polygon(S([(12,21),(15,19),(16,21)]),fill=GL)
    d.line(S([(26,8),(30,11)]),fill=(96,52,58,255));d.line(S([(26,9),(31,13)]),fill=(70,40,46,255));d.line(S([(27,11),(32,15)]),fill=(96,52,58,255));d.point((30,15),fill=(70,40,46,255))
    d.rectangle([0,21,W-1,22],fill=W4);d.line([(1,23),(W-2,23)],fill=DK2)          # sill
    d.rectangle([1,24,W-2,H-1],fill=W1);d.line([(1,H-1),(W-2,H-1)],fill=DK2)          # a short wall to the bottom
    for x in (7,20):d.line([(x,23),(x,24)],fill=RUST2)
    d.point((13,24),fill=BLOOD)
    grime(im,(0,0,W-1,H-1),r,22,[W1,DK2])
    return im
w3=winC3();w3.save('/tmp/dw/final_winC3.png');print('winC3',w3.size)

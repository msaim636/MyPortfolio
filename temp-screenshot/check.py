from PIL import Image
img = Image.open('phone-frame.png')
img = img.convert('RGBA')
alpha = img.split()[3]
print(f"Min alpha: {alpha.getextrema()[0]}")

import jieba #引入结巴库
from wordcloud import WordCloud #引入词云图
import matplotlib.pyplot as plt
import sys

text = sys.argv[1]
btn_text = sys.argv[2]
words = jieba.cut(text) #中文分词
#添加字体文件 随便找一个字体文件就行 不然不支持中文
font = './font.ttf'
# 创建词云对象
wordcloud = WordCloud(font_path=font,width=1000,height=800,background_color='white').generate(''.join(words))

# 保存词云图到当前目录下的wordclound文件夹中
filename = f"wordcloud/{btn_text}.png"
wordcloud.to_file(filename)

var indexUl = document.querySelector(".imgdiv>ul");
// li标签
var indexLi=indexUl.querySelectorAll("li");   
var lengthLi =indexLi.length;
// 最大的div
var pop = document.querySelector(".imgdiv");
var lfspan=pop.querySelector('.lf');
var rfspan=pop.querySelector('.rf');
// 设置左右按钮居中
lfspan.style.top=(parseInt(pop.offsetHeight)-60)/2+'px';
rfspan.style.top=(parseInt(pop.offsetHeight)-60)/2+'px';
// 初始化,获得显示框的宽度
var content_width=parseInt(pop.offsetWidth);

const TIME=2000;
var timer;

// 设置全局累加器，判断动到哪一张图片**************
var num=0;
// 跟随图片的个数,动态设置圆点的个数
newsbigdiv=document.createElement('div');
newsbigdiv.className='newsbigdiv';
pop.appendChild(newsbigdiv);
// 循环创建子div,给每个子div一个class样式,加一个索引
for(var i=0;i<lengthLi;i++){
    newsdiv=document.createElement('div');
    newsbigdiv.appendChild(newsdiv);
    newsdiv.className="newsdiv";
    newsdiv.setAttribute('index',i);//给每个子div设置一个索引值
}
// 获取圆点div个数,让其左偏移,居中显示
var divsv = newsbigdiv.querySelectorAll('div');
newsbigdiv.style.left=(content_width-divsv.length*60)/2+'px';
// 默认第一个为高亮
divsv[0].style.opacity=1;


function change(){
    // 把所有圆点样式透明设置为0.3
    for(var j=0;j<lengthLi;j++){
        divsv[j].style.opacity=0.3;
    }
    // 给当前索引为num的图片改变圆点高亮显示
    divsv[num].style.opacity=1;
    indexUl.style.left=-num*content_width+'px';
}

for(var i=0;i<lengthLi;i++){
    divsv[i].onclick=function(){
        num=this.getAttribute('index');
        change();
    }
}
lfspan.onclick=function(){
    num--;
    if(num==-1){
        num=lengthLi-1;
    }
    change();
}
rfspan.onclick=function(){
    num++;
    if(num==lengthLi){
        num=0;
    }
    change();
}

timer=setInterval(rfspan.onclick,TIME);

// 当鼠标放在图片上时,清除定时器
pop.onmouseover=function(){
    clearInterval(timer);
}
// 鼠标离开定时器时,开启定时器
pop.onmouseout=function(){
    timer=setInterval(rfspan.onclick,TIME);
}
window.onload = function () {
      var list = document.getElementById("list");
      var next = document.getElementById("next");
      var prev = document.getElementById("prev");

      // 初始化图片的宽度和第一张图片的位置
      var imgWidth = document.body.clientWidth;
      var img = document.getElementsByClassName('img');
      for (let i = 0; i < img.length; i++) {
        img[i].style.width = imgWidth + 'px';
      }
      list.style.left = -imgWidth + 'px';

      window.onresize = function () { // 实时监听浏览器窗口大小
        imgWidth = document.body.clientWidth;
        for (let i = 0; i < img.length; i++) {
          img[i].style.width = imgWidth + 'px';
        }
        list.style.left = -imgWidth + 'px';
      }

      function animate (offset) {
        // 获取的style.left是字符串，需要用parseInt()取整转化为数字**********是否要取负值
        var newLeft = parseFloat(list.style.left) + offset;
        if (newLeft < -imgWidth * 5) {
          list.style.left = -imgWidth + "px";
        } else if (newLeft > -imgWidth) {
          list.style.left = -imgWidth * 5 + "px";
        } else {
          list.style.left = newLeft + "px";
        }
      }

      // 设置图片循环滚动
      var timer;
      function play () {
        timer = setInterval(function () {
          next.onclick();
        }, 2000)
      }
      play();

      // 鼠标放在图片上时图片停止滚动     这里，我们需要对其DOM进行操作，所以需要获取整个轮播图区域
      var container = document.getElementById('container');
      function stop () {
        clearInterval(timer);
      }
      container.onmouseover = stop;
      container.onmouseout = play;


      // 以上一个简单的轮播图做完了，接下来给轮播图加上一排小圆点
      var buttons = document.getElementById("buttons").getElementsByTagName("span");
      var index = 1;
      function buttonsShow () {
        // 这里需要清除之前的样式
        for (var i = 0; i < buttons.length; i++) {
          if (buttons[i].className === "on") {
            buttons[i].className = '';
          }
        }
        // 数组从0开始，故index需要-1
        buttons[index - 1].className = 'on';
      }
      prev.onclick = function () {
        index -= 1;
        if (index < 1) {
          index = 5;
        }
        buttonsShow();
        animate(imgWidth);
      }
      next.onclick = function () {
        // 由于上边定时器的作用，index会一直递增下去，我们只有5个小圆点，所以需要做出判断
        index += 1;
        if (index > 5) {
          index = 1;
        }
        buttonsShow();
        animate(-imgWidth);
      }


      // 现在实现鼠标点击任意一个点，切换到相应的图片，原理是通过偏移量去找到对应的图片
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
          // 偏移量获取：这里获得鼠标移动到小圆点的位置，用this把index绑定到对象buttons[i]上，去谷歌this的用法
          // 由于这里的index是自定义属性，需要用到getAttribute()这个DOM 2级方法，去获取自定义index的属性
          var clickIndex = parseInt(this.getAttribute('index'));
          var offset = imgWidth * (index - clickIndex);
          animate(offset); // 存放鼠标点击后的位置，用于小圆点的正常显示
          index = clickIndex;
          buttonsShow();
        }
      }
    }

<template>
  <div class="flex">
    <div class="scroll-container">
      <div class="scroll-container-warp-item"></div>
      <div class="scroll-container-warp-item"></div>
      <div class="scroll-container-warp-item targetBox">
        IntersectionObserver
      </div>
      <div class="scroll-container-warp-item"></div>
      <div class="scroll-container-warp-item"></div>
      <div class="scroll-container-warp-item"></div>
    </div>

    <div class="scroll-container-image">
      <img
        v-for="(imgObj, index) in image_list"
        :key="index"
        :data-src="imgObj.url"
        class="scroll-container-warp-item-img"
      />
    </div>
    <div class="scroll-container-interest">
      <div
        v-for="(imgObj, index) in image_list"
        :key="index"
        class="scroll-container-warp-item-interest"
      >
        {{ index }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      interestTarget: null,
      image_list: [
        {
          url:
            "http://dev-images.thedeer.cn/user/70944194c863ad59d6ed54a469c9c086y1dadcrhappqbfy7.jpg-thumbnail_240"
        },
        {
          url:
            "http://dev-images.thedeer.cn/user/b9f272cb7fdf3794200aa67ce016d9ea20czbz4p2yutgaqx.jpg-thumbnail_240"
        },
        {
          url:
            "http://dev-images.thedeer.cn/user/044aa31d0dcbe456feef10024c1a2b80kgmhcjsfbm9do5o0.jpg-thumbnail_240"
        },
        {
          url:
            "http://dev-images.thedeer.cn/user/70944194c863ad59d6ed54a469c9c086y1dadcrhappqbfy7.jpg-thumbnail_240"
        },
        {
          url:
            "http://dev-images.thedeer.cn/user/b9f272cb7fdf3794200aa67ce016d9ea20czbz4p2yutgaqx.jpg-thumbnail_240"
        },
        {
          url:
            "http://dev-images.thedeer.cn/user/044aa31d0dcbe456feef10024c1a2b80kgmhcjsfbm9do5o0.jpg-thumbnail_240"
        }
      ]
    };
  },
  mounted() {
    //用法
    let options = {
      root: document.querySelector(".scroll-container"),
      rootMargin: "10px",
      threshold: [0.2, 0.8, 1]
    };
    let handler = function(entries, observer) {
      entries.forEach(entry => {
        // console.log(entry);
      });
    };

    let observer = new IntersectionObserver(handler, options);

    const target = document.querySelector(".targetBox");
    observer.observe(target);
    //图片懒加载
    let imageOptions = {
      root: document.querySelector(".scroll-container-image"),
      rootMargin: "10px",
      threshold: [0.2, 0.8, 1]
    };
    let imageHandler = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          //解除监听
          observer.unobserve(entry.target);
        }
      });
    };

    let imgObserver = new IntersectionObserver(imageHandler, imageOptions);
    let imageTarget = document.getElementsByClassName(
      "scroll-container-warp-item-img"
    );
    //绑定监听
    imageTarget.forEach(item => {
      imgObserver.observe(item);
    });
    //兴趣埋点
    let interestOptions = {
      root: document.querySelector(".scroll-container-interest"),
      rootMargin: "0px",
      threshold: [0, 1]
    };
    let interest = [];
    let startTime = "";

    let interestHandler = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.intersectionRatio == 1 && entry.intersectionRatio) {
          //开启监听isIntersecting
          startTime = entry.time;
        }
        if (entry.intersectionRatio == 0 && !entry.intersectionRatio) {
          if (entry.time - startTime > 2000) {
            entry.target.count++;
          }
        }
      });
    };

    let interestObserver = new IntersectionObserver(
      interestHandler,
      interestOptions
    );
    let interestTarget = [
      ...document.getElementsByClassName("scroll-container-warp-item-interest")
    ];
    interestTarget.map(item => {
      item.count = 0;
      interestObserver.observe(item);
    });
    this.interestTarget = interestTarget;
  }
};
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  flex-wrap: wrap;
}
.scroll-container,
.scroll-container-image,
.scroll-container-interest {
  width: 300px;
  height: 400px;
  overflow: scroll;
  margin: 8px;
}
.scroll-container-warp {
  width: 100%;
  height: 1000px;
}
.scroll-container-warp-item {
  width: 100%;
  height: 250px;
  border-bottom: 1px solid #000;
}
.scroll-container-warp-item-img {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #000;
}
.scroll-container-warp-item-interest {
  width: 100%;
  height: 200px;
  border-bottom: 1px solid #000;
}
</style>

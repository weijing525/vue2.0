<template>
		<div class="indexpage">
			<p>首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页</p>
		</div>
</template>
<script type="text/javascript">
	module.exports = {
		data:function(){
			return{
				title:'首页',
				moveList:[],
			}
		},
		methods:{
			
		},
		mounted:function(){
			setTimeout(function(){
				router.app.$children[0].$data.showLoading = false;
				//console.log(router.app);
			},300)
			// this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
		 //        headers: {

		 //        },
		 //        emulateJSON: true
		 //    }).then(function(response) {
		 //      // 这里是处理正确的回调
		 //        this.moveList = response.data.subjects
		 //        // this.articles = response.data["subjects"] 也可以
		 //    }, function(response) {
		 //        // 这里是处理错误的回调
		 //        console.log(response)
		 //    });
			//apikey:8564dae6a6594ad2f103b9227f2939de
		}
	}
</script>
<style type="text/css">
	.top-list{
		padding: 0 10px 0 0;
		box-sizing: border-box;
	}
	.top-list li{
		width: 50%;
		float: left;
		padding: 10px 0 0 10px;
		box-sizing: border-box;
		text-align: center;
	}	
	.top-list li img{
		width: 100%;
		height: 220px;
	}

</style>
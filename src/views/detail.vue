<template>
	<div>
		<table>
			<tr>
				<td>中文名</td>
			 	<td>{{detail.title}}</td>
			 	<td>原名</td>
			 	<td>{{detail.original_title}}</td>
			</tr>
			<tr>
				<td>评分人数</td>
			 	<td>{{detail.ratings_count}}</td>
			 	<td>想看人数</td>
			 	<td>{{detail.wish_count}}</td>
			</tr>

			<tr>
				<td>在看人数</td>
			 	<td>{{detail.do_count}}</td>
			 	<td>看过人数</td>
			 	<td>{{detail.collect_count}}</td>
			</tr>

			<tr>
				<td>导演</td>
			 <!-- 	<td>{{detail.directors}}</td> -->
			 	<td>看过人数</td>
			 	<td>{{detail.collect_count}}</td>
			</tr>

		</table>
	</div>
</template>
<script type="text/javascript">
	module.exports = {
		data:function(){
			return{
				detail:[],
				id:''
			}
			
		},
		mounted:function(){
			var id = router.app._route.query.id;
			this.$http.jsonp('https://api.douban.com/v2/movie/subject/'+id, {}, {
		        headers: {
		        },
		        emulateJSON: true
		    }).then(function(response) {
		      // 这里是处理正确的回调
		        this.detail = response.body;
		        _app.title  = response.body.title;
		    }, function(response) {
		        // 这里是处理错误的回调
		        console.log(response)
		    });
		}
	}
</script>
<style type="text/css">
	
</style>
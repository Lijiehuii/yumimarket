<template>
    <div class="collect-content">
        <div class="collect-img">
            <img :src="item.wholeIcon" alt="我的图片呢">
        </div>
        <div  class="collect-text">
            <div>
                <p>{{itemData.title}}</p>
            </div>
            <div class="price-box">
                <p>￥{{item.price}}</p>
                <p>库存{{item.stock}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            item: Object
        },
        created() {
            this.itemData = this.item
            console.log(this.item)
        },
        data() {
            return {
                itemData: {}
            }
        }
    }
</script>

<style lang="scss" scoped>
    .collect-content {
        
        display: flex;



        .collect-text{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .price-box {
          
            display: flex;
            // flex-direction: column;
            justify-content: space-between;
        }

        .collect-img {
            width: 19vw;

            img {
                display: block;
                width: 100%;
                height: auto;
            }
        }
    }
</style>
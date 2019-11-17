<template>
    <div>
        <i class="fas fa-search" style="margin-right: 8px; font-size:1.4rem;"></i><input  style="margin-left:5px;" class="searchbar" type="text" v-model="search" placeholder="search abang...">
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            search:""
        }
    },
    watch: {
        search: function (){
            this.$emit('search', this.search.toLowerCase())
        }
    }
}
</script>

<style scoped>
    input {
        border: 0px;
        height: 80%;
        width: 70%;
        outline: none;
        background-color: transparent;
        font-size: 1.4rem;
        padding-left: 2px;
    }
   
    div {
        border: 2px solid #f46a35;
        /* border-radius: 20px; */
        height: 30px;
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    div:focus-within{
        box-shadow: 0px 0px 5px hsl(17, 90%, 58%);
        transition-duration: 0.3s;
    }
</style>

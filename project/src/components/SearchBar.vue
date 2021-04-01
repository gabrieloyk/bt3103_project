<template>
<div id="app">
  <div class="search-wrapper">
      <label>Search for existing food:</label><br>
    <input type="text" v-model="search" placeholder="Search title.."/>
        
  </div>
  <div class="wrapper">
    <div class="card" v-for="item in filteredItems"  v-bind:key="item.id">
        <a>
        <b>{{ item.name }}</b>
        <small>expiring on :</small>
        <b>{{ item.expiry }}</b>
        </a>
    </div>
  </div>
</div>
    
</template>


<script>
import firebase from 'firebase/app';

    export default {
        data() {
            return {
                search : '',
                items: [],
            }
        },
        methods: {
            fetchItems() {
                firebase.firestore().collection('foods').where("userID","==",firebase.auth().currentUser.uid).onSnapshot((querySnapShot)=>{
                this.items = [];
                let item={}
                querySnapShot.forEach(doc=>{
                item=doc.data()
                item.show=false
                item.id=doc.id
                item.expiry = doc.data().expireddate.toDate().toString().substring(0,15)
                this.items.push(item) 
                })      })
                  
            },
            
        },

        created(){
            this.fetchItems()    
        },

        computed: {
            filteredItems:function() {
                return this.items.filter(item => {
                    return item.name.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        },
        
    }
</script>


<style scoped>
html, body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 16px;
  margin-bottom: 16px;
}

.search-wrapper {
    position: relative;
}

input {
    padding: 4px 12px;
    color: rgba(0,0,0,.70);
    border: 3px solid plum;
    border-radius: 5em;
    transition: .15s all ease-in-out;
    background: white;
}

input:focus {
    outline: none;
    transform: scale(1.05);
}

.wrapper {
    display: flex;
    max-width: 100%;
    flex-wrap: wrap;
    padding-top: 12px;
  }

.card {
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
    max-width: 200px;
    margin: 12px;
    transition: .15s all ease-in-out;
    padding: 10px;
}
.card:hover {
    transform: scale(1.1);
}
a {
    text-decoration: none;
      padding: 12px;
      color: black;
      font-size: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
}
small {
        font-size: 15px;
        color: blueviolet;
        padding: 4px;
      }
label {
    color: darkmagenta;
}
</style>


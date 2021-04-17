<template>
<div id="app">
    <app-header></app-header>
    <br>
    <label class="dropdown">See existing/consumed/expired:</label>
        <select id="category" name="category">
            <option value="existing">Existing Food</option>
            <option value="consume">Consumed Food</option>
            <option value="expired">Expired Food</option>
        </select>
  <button class="view" v-on:click="chooseCat()"> View </button>
  <div class="search-wrapper">
    <br>
    <input type="text" v-model="search" placeholder="Search food.."/>
  </div>
  
  <div>
      <div class = "wrapper" v-show="expired"> 
          <div class="card" v-for="item in filteredItems" v-show="item.expired" v-bind:key="item.id"  v-on:click="item.show = !item.show">
        <a> <b style="color:red"> EXPIRED </b>
        <img v-bind:src="item.img"/>
        <b>{{ item.name }}</b>
        <small style="color:red; ">expired on :</small>
        <b>{{ item.expiry }}</b>
        </a>
        <div v-show="item.show"> 
            <p> Food item : {{item.name}} </p>
            <p> Expired on : {{ item.expiry }} </p>
        </div>
    </div> </div>
      <div class="wrapper" v-show="consume"> <div class="card" v-for="item in filteredItems" v-show="item.consumed" v-bind:key="item.id"  v-on:click="item.show = !item.show">
        <a>
        <img v-bind:src="item.img"/>
        <b>{{ item.name }}</b>
        <small>expired on :</small>
        <b>{{ item.expiry }}</b>
        </a>
        <div v-show="item.show"> 
            <p> Food item : {{item.name}} </p>
            <p> Expired on : {{ item.expiry }} </p>
        </div>
    </div> </div>
      <div class="wrapper" v-show="existing"> <div class="card" v-for="item in filteredItems" v-show="!item.consumed && !item.expired" v-bind:key="item.id"  v-on:click="item.show = !item.show">
        <a>
        <img v-bind:src="item.img"/>
        <b>{{ item.name }}</b>
        <small>expiring on :</small>
        <b>{{ item.expiry }}</b>
        </a>
        <div v-show="item.show"> 
            <p> Food item : {{item.name}} </p>
            <p> Expiring on : {{ item.expiry }} </p>
            <button id="consumeBtn" v-on:click="consumed(item.id)"> <b>Consume</b> </button>
            <!--<button> Edit </button>-->
            <button id="deleteBtn" v-on:click="deleteFood(item.id)"> <b>Delete</b> </button>
        </div>
    </div> </div>
    
  </div>
</div>
    
</template>


<script>
import firebase from 'firebase/app';
import Header from '../components/Header.vue';

    export default {
        data() {
            return {
                search : '',
                items: [],
                expired: false,
                existing: true,
                consume: false,
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
                item.img=doc.data().imgfile
                this.items.push(item)
                })      })
                  
            },
            consumed: function(itemId) {
                
                firebase.firestore().collection('foods').doc(itemId).update({
                  consumed:true,
                  consumedDate:new Date(),
                }).then(() => {
                    console.log("Consumed state!");
                })           
            },
            deleteFood: function(itemId) {
                firebase.firestore().collection('foods').doc(itemId).delete().then(() => {location.reload()});
            },
            chooseCat: function() {
                var c = document.getElementById("category");
                var v = c.value;
                if (v == "consume") {
                    this.consume = true;
                    this.expired = false;
                    this.existing = false;
                } else if (v == "existing") {
                    this.consume = false;
                    this.expired = false;
                    this.existing = true;
                } else {
                    this.consume = false;
                    this.expired = true;
                    this.existing = false;
                }
            }
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
        components:{
            'app-header':Header,
        }
        
    }
</script>


<style scoped>
html, body {
  display: -moz-grid-line;
  align-items: center;
  justify-content: center;
  /*flex-direction: column;*/
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
    padding: 12px;
  }

.card {
    box-shadow: rgba(155, 10, 140, 0.118) 0px 1px 6px, rgba(209, 114, 212, 0.118) 0px 1px 4px;
    max-width: 100%;
    margin: 12px;
    transition: .15s all ease-in-out;
    padding: 20px;
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
img {
        height: 100px;
      }
.dropdown {
    padding: 10px;
}
.view {
    background: plum;
    color: white;
    font: bold;
    border: transparent;
    padding: 5px;
    margin-left: 5px;
    border-radius: 5px;
}
#category {
    color: rgb(80, 36, 80);
    font-size: 15px;
    padding: 5px;
}
#consumeBtn {
    background: rgb(138, 214, 93);
    border: transparent;
    padding: 8px;
    border-radius: 3px;
    color: white;
}
#deleteBtn {
    background: rgb(255, 116, 116);
    border: transparent;
    padding: 8px;
    border-radius: 3px;
    color: white;
}

</style>


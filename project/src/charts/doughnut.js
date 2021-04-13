import { Doughnut } from 'vue-chartjs';
import firebase from 'firebase/app';

export default {
  extends: Doughnut,
  data() {
    return {
        fruits_veg:[],
        meat:[],
        dairy:[],
        snacks:[],
        beverages:[],
        others:[],
        datacollection: {
            labels: ["fruits & vegetables", "meat & seafood", "dairy & bakery", "snacks", "beverages","others"],
            datasets: [{
                label: "item",
                backgroundColor: ["#9bc472","#f2c76e","#ea7186", "#bd9bda", "#7a77b9", "#fbc4bf"],
                data: []
              }]
        },
        options: {
            legend: { display: true},
            title: {
              display: true,
              text: "Fresh Food by Category",
            },
            responsive: true,
            maintainAspectRatio: false
        },      
    }
  },
  methods: {
    fetchItems:function(){
      firebase.firestore().collection('foods').where("userID","==",firebase.auth().currentUser.uid)
      .get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()  
            if(item.expired == false && item.consumed == false) {
              if(item.category=="fruits & vegetables"){
                this.fruits_veg.push(item)
              } else if(item.category === "meat & seafood") {
                this.meat.push(item)
              } else if(item.category === "dairy & bakery") {
                this.dairy.push(item)
              } else if(item.category === "snacks") {
                this.snacks.push(item)
              } else if(item.category === "beverages") {
                this.beverages.push(item)
              } else if(item.category === "others") {
                this.others.push(item)
              }
            }
          })
            this.datacollection.datasets[0].data.push(this.fruits_veg.length)
            this.datacollection.datasets[0].data.push(this.meat.length)
            this.datacollection.datasets[0].data.push(this.dairy.length)
            this.datacollection.datasets[0].data.push(this.snacks.length)
            this.datacollection.datasets[0].data.push(this.beverages.length)
            this.datacollection.datasets[0].data.push(this.others.length)
            this.renderChart(this.datacollection, this.options)
          })        
        },
  },
  created() {
    this.fetchItems()
  },
}



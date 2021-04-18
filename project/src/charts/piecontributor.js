import { Pie } from 'vue-chartjs';
import firebase from 'firebase/app';

export default {
  extends: Pie,
  data() {
    return {
        item_counts:[], //how many wasted food
        contributor:[], //contributors of the food
        //only allow up to five members in a family account
        backgroundColor:[],
        idx_color:0, //maximum 4 as only 5 users allowed
        color:["#f2c76e","#ea7186", "#bd9bda", "#7a77b9","#9bc472"],
        datacollection: {
            labels: [],
            datasets: [{
                label: "item",
                backgroundColor: [],
                data: []
              }]
        },
        options: {
            legend: { display: true},
            responsive: true,
            maintainAspectRatio: false
        },      
    }
  },
  methods: {
    datediff:function(date1,date2) {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
      const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
      const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  },
    fetchItems:function(){
      var dict = new Object() //create hash of users and their items
      firebase.firestore().collection('foods').where("userID","==",firebase.auth().currentUser.uid)
      .get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            var today = new Date()
            item=doc.data()  
              if(item.expired == true && 
                item.consumed == false &&
                this.datediff(item.createdOn.toDate(), today) <= 31) { //only retrieve wasted food this month
                console.log(item)
                if(!(item.username in dict)) {
                  dict[item.username] = 1
                  this.backgroundColor.push(this.color[this.idx_color]) //push first color
                  this.idx_color += 1
                } else {
                  dict[item.username] += 1
                }
              }
            }
          )
          for (var username in dict) {
            this.contributor.push(username)
            this.item_counts.push(dict[username])
          }
            this.datacollection.datasets[0].data = this.item_counts
            this.datacollection.labels = this.contributor
            this.datacollection.datasets[0].backgroundColor = this.backgroundColor
            this.renderChart(this.datacollection, this.options)
          })
            
      
     
            
        },
  },
  created() {
    this.fetchItems()
  },
}



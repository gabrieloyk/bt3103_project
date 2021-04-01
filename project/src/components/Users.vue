
Search Vuetify (press /)
Premiere Sponsors
#List item groups
The v-list-item-group provides the ability to create a group of selectable v-list-items. The v-list-item-group component utilizes v-item-group at its core to provide a clean interface for interactive lists.


#Usage
By default, the v-list-item-group operates similarly to v-item-group. If a value is not provided, the group will provide a default based upon its index.

#API
v-list-group
v-list-item
v-list-item-action
v-list-item-action-text
v-list-item-avatar
v-list-item-content
v-list-item-group
v-list-item-subtitle
v-list-item-title
#Examples
#Props
#Active class
You can set a class which will be added when an item is selected.

<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-list>
      <v-list-item-group
        v-model="model"
        active-class="border"
        color="indigo"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          icon: 'mdi-wifi',
          text: 'Wifi',
        },
        {
          icon: 'mdi-bluetooth',
          text: 'Bluetooth',
        },
        {
          icon: 'mdi-chart-donut',
          text: 'Data Usage',
        },
      ],
      model: 1,
    }),
  }
</script>

<style scoped>
.border {
  border: 2px dashed orange;
}
</style>
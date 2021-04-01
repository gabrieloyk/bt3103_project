<template>
  <div id="uploadpic">
    <vue-dropzone
      ref="imgDropZone"
      id="customdropzone"
      :options="dropzoneOptions"
      @vdropzone-complete="afterComplete"
    ></vue-dropzone>
    <div v-if="images.length > 0" class="image-div">
      <div v-for="image in images" :key="image.src">
        <img :src="image.src" class="image" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
let uuid = require("uuid");
export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        addRemoveLinks: false,
        acceptedFiles: ".jpg, .jpeg, .png",
        dictDefaultMessage: `<p class='text-default'><i class='fa fa-cloud-upload mr-2'></i> Drag Images or Click Here to Upload</p>
          <p class="form-text">Allowed Files: .jpg, .jpeg, .png</p>
          `
      },
      images: []
    };
  },
  methods: {
    async afterComplete(upload) {
      var imageName = uuid.v1();
      this.isLoading = true;
      try {
        //save image
        let file = upload;
        var metadata = {
          contentType: "image/png"
        };
        var storageRef = firebase.storage().ref();
        var imageRef = storageRef.child(`foods/${imageName}.png`);
        await imageRef.put(file, metadata);
        var downloadURL = await imageRef.getDownloadURL();
        this.images.push({ src: downloadURL });
      } catch (error) {
        console.log(error);
      }
      this.$refs.imgDropZone.removeFile(upload);
    }
  }
};
</script>

<style>
.image-div {
  display: flex;
  margin: 25px;
}
.image {
  max-width: 250px;
  margin: 15px;
}
#uploadpic {
  padding:5px;
}
</style>
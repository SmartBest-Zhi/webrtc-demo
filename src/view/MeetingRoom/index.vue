<template>
  <div style="width: 100%; height: 100%">
    <a-row :gutter="16">
      <a-col :span="20">
        <video id="videoCanvas" autoplay style=";height: 520px;margin: 0 auto; display: block;background: black"></video>
      </a-col>


      <a-col :span="4">
        <a-select v-model:value="selectedVideoId" style="width: 100%" >
          <a-select-option
            v-for="(item, index) in deviceList.videoIn"
            :key="index"
            :value="item.id"
            >{{ item.label }}
          </a-select-option>
        </a-select>

        <a-select v-model:value="selectedAudioId" style="width: 100%" >
          <a-select-option
            v-for="(item, index) in deviceList.audioIn"
            :key="index"
            :value="item.id"
            >{{ item.label }}
          </a-select-option>
        </a-select>

        <a-button size="large" @click="closeStream">
          挂断
        </a-button>

      </a-col>

    </a-row>

    <a-row style="margin-top: 24px">

    </a-row>

    <a-row style="margin-top: 24px;background: black" justify="end">

    </a-row>

  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

var deviceList = ref({
  audioIn: [],
  videoIn: [],
  audioOut: [],
});

const selectedVideoId = ref("");
const selectedAudioId = ref("");

// 获取权限的条件
var constraint = {
  video: {
    width: {
      min: 320,
      ideal: 1280,
      max: 1920,
    },
    height: {
      min: 240,
      ideal: 720,
      max: 1080,
    },
    // 帧率
    frameRate: { ideal: 10, max: 15 },
    // user（前置摄像头）、environment（后置摄像头）
    facingMode: "user",
  },
  audio: true,
};

function handleError(error) {
  window.message.error("摄像头无法正常使用，请检查是否占用或缺失");
  console.error(
    "navigator.MediaDevices.getUserMedia error: ",
    error.message,
    error.name
  );
}

const initialMediaDevices = async () => {
  // 兼容性判断
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("浏览器不支持获取媒体设备");
    return;
  }

  // 用于获取权限
  navigator.mediaDevices.getUserMedia(constraint).then((stream) => {
    stream.getTracks().forEach((trick) => {
      trick.stop();
    });
  });
  // 初始化设备列表
  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      devices.forEach((device) => {
        let obj = {
          id: device.deviceId,
          kind: device.kind,
          label: device.label,
        };
        if (device.kind === "audioinput") {
          if (
            deviceList.value.audioIn.filter((e) => e.id === device.deviceId)
              .length === 0
          ) {
            deviceList.value.audioIn.push(obj);
          }
        }
        if (device.kind === "audiooutput") {
          if (
            deviceList.value.audioOut.filter((e) => e.id === device.deviceId)
              .length === 0
          ) {
            deviceList.value.audioOut.push(obj);
          }
        } else if (device.kind === "videoinput") {
          if (
            deviceList.value.videoIn.filter((e) => e.id === device.deviceId)
              .length === 0
          ) {
            deviceList.value.videoIn.push(obj);
          }
        }
      });
    })
    .catch(handleError);
  // if (deviceList.value.videoIn.length > 0){
  //   selectedVideoId.value = deviceList.videoIn[0]
  // }
  // if (deviceList.value.audioIn.length > 0){
  //   selectedAudioId.value = deviceList.audioIn[0]
  // }
};

const getTargetDeviceStream = async () => {
  const constraint = {
    audio: {
      deviceId: selectedAudioId.value
        ? { exact: selectedAudioId.value }
        : undefined,
    },
    video: {
      deviceId: selectedVideoId.value
        ? { exact: selectedVideoId.value }
        : undefined,
      width: 1920,
      height: 1080,
      frameRate: { ideal: 15, max: 60 },
    },
  };
  // 清除当前标签页中没有销毁的媒体流
  if (window.stream) {
    window.stream.getTracks().forEach((track) => {
      track.stop();
    });
  }
  //被调用方法前面有，此处不再重复
  let stream = await navigator.mediaDevices
    .getUserMedia(constraint)
    .catch(handleError);
  document.getElementById("videoCanvas").srcObject = stream
};

/**
 * 获取屏幕
 */
const getDisplayMedia = async () => {
  const constraints = {
    video: {
      width: 1920,
      height: 1080,
    },
    audio: false,
  };
  if (window.stream) {
    // 清除当前标签页中没有销毁的媒体流
    window.stream.getTracks().forEach((track) => {
      track.stop();
    });
  }
  return await navigator.mediaDevices
    .getDisplayMedia(constraints)
    .catch(handleError);
};


const closeStream = ()=>{
  if (window.stream) {
    // 清除当前标签页中没有销毁的媒体流
    window.stream.getTracks().forEach((track) => {
      track.stop();
    });
  }
}

const onSelectVideoDevice = (value) => {
  selectedVideoId.value = value;
};

onMounted(async () => {
  initialMediaDevices();
  console.log(deviceList.value);
});

watch(() => selectedVideoId.value, (newValue, oldValue) => {

    if (newValue !== ""){
      getTargetDeviceStream()
    }
})


</script>

<style>
</style>
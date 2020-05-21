import axios from 'axios';

const END_POINT = 'https://pictorial.ga';

export async function createRoom(payload) {
  try {
    const response = await axios.post(`${END_POINT}/create`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function checkRoomCode(payload) {
  try {
    const response = await axios.post(`${END_POINT}/invite`, { roomCode: payload });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function connectRoom(payload) {
  try {
    const response = await axios.post(`${END_POINT}/joinRoom`, { name: payload.name, roomCode: payload.code });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function imageUpload(payload) {
  try {
    console.log(payload.image);
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('roomCode', payload.code);
    formData.append('IMG_FILE', payload.image);
    
    const response = await axios.post(`${END_POINT}/images/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function imageReadyRequest(code) {
  try {
    const response = await axios.get(`${END_POINT}/images/ready?code=${code}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function reuploadRequest(payload) {
  try {
    const response = await axios.post(`${END_POINT}/images/cancel`, { name: payload.name, roomCode: payload.code });
    return response;
  } catch (error) {
    throw error;
  }
}
import axios from 'axios';
import { get } from 'http';

const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMzU0ODhmMmY5YzkzM2Y3NGQwM2Y0NCIsImVtcGxveWVlSUQiOiJhZG1pbiIsInVzZXJuYW1lIjoiYWRtaW4iLCJkZXBhcnRtZW50IjoiYWRtaW4iLCJpYXQiOjE1NzUzNjQ5NjF9.hK6dCY8nK34OguX02hl_V4YHtrDgSd7sji36EaWwEA8';
const Url = 'http://172.17.130.131:3000/machineStatusLogDayDetailReport'

const PostFunction = (sendData) => {
    return new Promise((resolve, reject) => {
        axios.post(
            Url,
            sendData,
            {
                headers: {
                    "Authorization": Token
                }
            })
            .then((response) => {
                const getJson = JSON.parse(JSON.stringify(response.data));

                if (getJson.results) {
                    let getData = getJson.results.data;

                    return resolve(getData);
                }
                return resolve(null);
            })
            .catch((error) => {
                console.log('请求出错', error);
            });
    });
}


export {
    PostFunction
}
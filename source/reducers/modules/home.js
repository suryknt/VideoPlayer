const initialState={  
    videoIndex:0
};
export default function (state = initialState, action) {
    let {type,payload}=action;
  switch (type) {
   case 'SET_VIDEO_INDEX':{
       return  {...state,videoIndex:payload};
   }
    default:
      return state;
  }
}

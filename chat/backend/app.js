const questions = require('./data/Questions.json')

replies = questions.data
const io = require('socket.io')( 3000,{
    maxHttpBufferSize: 1e8,
    cors:{
      origin: ["http://localhost:3000","http://localhost:3001","http://172.17.238.23:3000","http://172.17.238.23:3001"],
      methods:['GET','POST']
    }
  })

 function weightedRandom(items, weights) {
  if (items.length !== weights.length) {
    throw new Error('Items and weights must be of the same size');
  }

  if (!items.length) {
    throw new Error('Items must not be empty');
  }

  
  const cumulativeWeights = [];
  for (let i = 0; i < weights.length; i += 1) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  }

  const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
  const randomNumber = maxCumulativeWeight * Math.random();


  for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    if (cumulativeWeights[itemIndex] >= randomNumber) {
      return {
        item: items[itemIndex],
        index: itemIndex,
      };
    }
  }
}

io.on("connection" , socket=>{
    const category = {"emotional abuse":10,"depression":10}
    const alreadyAsked = []
    const LIMITPOINT = 40 ;
    var numberOfInterations = 0;
    
    console.log("Connection established")
    socket.on("send-message", delta => {
        numberOfInterations++
        console.log(delta)
        replies.forEach(e => {
            
            
            if (e.question === delta.question){
                  
                    for(let i = 0 ; i <e.options.length ; i++ ){
                        if(e.options[i] == delta.message){
                            category[e.tag] += (e.options.length -i-1) * e.points *0.4
                        }
                    } 
                }
            }
          );
        for (var i in category){
          console.log(category[i])
          if(category[i] >= LIMITPOINT){
            
            socket.emit("reply-on-limit-breach", {category:category,numberOfInterations:numberOfInterations})
            return ;
          }
        }
        
        var replyIndex = ""
        if (numberOfInterations>2){
            const weights = new Array(replies.length).fill(8)
            for (var i  = 0 ; i < replies.length; i++){
                for(var key in category ){  
                    if (key === replies[i].tag ){
                        weights[i] = category[key] 
                    }

                }
            }
            alreadyAsked.forEach((e)=>{
                weights[e] = -1
            })
            replyIndex = weightedRandom(replies,weights)
           

        }else{
            replyIndex = {"index":Math.floor(Math.random()*replies.length)}
        }
            
        alreadyAsked.push(replyIndex["index"])
     

        console.log(replies[replyIndex["index"]] )
        socket.emit("reply", { data:replies[replyIndex["index"]] , userFlag:"Bot" })
      })

      socket.on("send-text", delta =>{
        console.log(delta)
        socket.broadcast.emit("receive-text", {message:delta.message , userFlag:"doc"});
        
      })
    
})
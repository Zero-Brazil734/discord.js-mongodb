const user = require("../controllers/users") //유저 컨트롤러 파일 불러오기
const Discord = require("discord.js") //discord.js 모듈 불러오기

exports.run = async(client, message, args) => { //명령어 핸들링
    //... 커스텀 코드 
    message.channel.send("커스텀").then(msg => { //메세지를 보내는데 성공시: msg = "커스텀"이라고 보낸 메세지
        msg.react("✅") //해당 메세지에 반응
        msg.react("❌") //해당 메세지에 반응

        let filterYes = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id //반응 컬렉터 필터
        let collector = msg.createReactionCollector(filterYes, { time: 60000 }) //빈응 컬렉터 생성

        let filterNo = (reaction, user) => reaction.emoji.name === "❌" && user.id === message.author.id //반응 컬렉터 필터
        let coletor = msg.createReactionCollector(filterNo, { time: 60000 }) //반응 컬력터 생성

        coletor.on("collect", () => { //coletor이라는 반응 컬렉터에 반응 했을시:
            msg.delete() //메세지("커스텀" 메세지) 삭제
            return message.channel.send("등록을 안 하셨습니다.") //전송
        })

        collector.on("collect", () => { //collector이라는 반응 컬렉터에 반응 했을시:
            user.setUser(message.author.id, message.author.username).then(() => { //유저 컨트롤러 파일에서 setUser  항목을 핸들링, id는 메세지를 친 유저의 아이디로 설정, name는 메세지를 친 유저의 유저이름으로 설정
            //알아채셨을지 모르겠지만 여기서 전송하는 항목들은 모두 모델에서 필수라고 체크했던 것들입니다.
                message.channel.send(`${message.author} 님이 성공적으로 등록 되셨습니다.`) //성공시 전송
            }).catch(err => { //오류시:
                console.error(err)
                return message.channel.send("오류")
            })
        })
    })
}

exports.config = { //이게 없으면 오류납니다
    name: "등록", //명령어의 이름을 등록으로 설정
    aliases: ["ㄷㄹ", "가입", "회원가입"] //단축키 설정
}

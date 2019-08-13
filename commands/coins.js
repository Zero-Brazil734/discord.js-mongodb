const db = require("mongoose").connection //데이터베이스 불러오기
const givewater = new Set() //쿨타임 데이터 저장소 생성
const givewatercd = 86400000 //쿨타임 설정(밀리초)

require("dotenv").config() //암호화 파일 읽기 허용 설정

exports.run = (client, message, args) => { //명령어 핸들링
    db.collection("users").findOne({ _id: message.author.id }, (err, res) => { //해당 유저를 검색
        if(err) console.error(err) //오류시 출력

        if(!res) { //만약 해당 유저에 대한 데이터가 없다면:
            return message.channel.send(`${message.author} 님, 먼저 __${process.env.PREFIX}등록__을 써주세요.`) //등록 해달라고 전송
        }else{ //있다면:
            if(givewater.has(message.author.id)) { //해당 유저가 쿨타임 중인지 확인 후,
                return message.channel.send(`${message.author} 님, 해당 명령어는 쿨타임 중입니다.`) //쿨타임 중이라면 이렇게 전송
            }else{ //쿨타임 중이 아니라면
                givewater.add(message.author.id) //쿨타임 데이터 저장소에 해당 유저의 아이디 추가
                db.collection("users").findOneAndUpdate({ _id: message.author.id }, { $set: { //해당 유저를 데이터베이스에 검색 후 업뎃,
                    money: res.money + 100 //기존의 돈에 100원 추가
                }})
                setTimeout(() => { //givewatercd로 설정한 쿨타임이 지날시 
                    givewater.delete(message.author.id) //쿨타임 데이터 저장소에서 해당 유저의 아이디를 삭제
                }, givewatercd) //쿨타임 설정
                message.channel.send(`이제 ${message.author} 님의 소유금은 ${res.money + 100}원입니다.`)
             }
        }
    })
}

exports.config = { //이거 없으면 오류납니다
    name: "후원금", //명령어의 이름을 후원금으로 설정
    aliases: ["돈", "삥뜯기(?)", "돈내놔", "돈받기"] //단축키 목록 설정
}

const { Schema, model } = require("mongoose") //mongoose 모듈에서 Schema와 model만 추출

const userModel = new Schema({ //Schema 생성
    _id: { //_id = 유저 아이디로 설정되게 할겁니다.
        type: String, //_id의 종류(타입) = 문자열
        required: true //필수적으로 자체 설정이 필요함
    },
    name: { //name = 유저네임
        type: String, //name의 종류 = 문자열
        required: true //필수적으로 자체 설정이 필요함
    },
    level: { //level 항목 설정 
        type: Number, //level의 종류 = 숫자
        required: false, //필수X
        default: 1 //설정을 안 했을시에 기본 설정
    },
    xp: { //xp 항목 설정
        type: Number, //xp의 종류 = 숫자
        required: false, //필수X
        default: 0 //설정을 안 했을시에 기본 설정
    },
    money: { //money 항목 설정
        type: Number, //money의 종류 = 숫자
        required: false, //필수X
        default: 0 //설정을 안 했을시에 기본 설정
    }
})

module.exports = model("user", userModel) //데이터베이스 모델을 수출

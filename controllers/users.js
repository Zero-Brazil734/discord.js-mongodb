const user = require("../models/user") //설정한 모델 불러오기

module.exports = { //밑 내용을 수출
    async setUser(id, name) { //등록 코드 핸들링
        await user.create({ //모델에서 유저 생성(모델에서 유저 생성 = 데이터베이스에 유저 생성)
            _id: id, //핸들링해서 받은 id를 _id로 설정
            name: name //핸들링해서 받은 name를 name로 설정
        }).then(() => { //성공시:
            console.log(`유저 ${name}(${id) 저장 성공`) //출력
        }).catch(err => { //오류시
            console.error(`오류: ${err}`) //출력
        })
    },

    async showLevel(id) { //레벨 표기 코드 핸들링
        let findUser = await user.findById({ //모델에서 _id로 찾기
            _id: id //핸들링해서 받은 id로 찾기
        })

        return findUser.level //찾아서 나온 유저의 레벨을 전송
    }, 

    async showXp(id) { //경험치 표기 코드 핸들링
        let findUser = await user.findById({ //모델에서 _id로 찾기
            _id: id //핸들링해서 받은 id로 찾기
        })

        return findUser.xp //찾아서 나온 유저의 경험치을 전송
    },

    async showMoney(id) { //돈 표기 코드 핸들링
        let findUser = await user.findById({ //모델에서 _id로 찾기
            _id: id //핸들링해서 받은 id로 찾기
        })

        return findUser.money //찾아서 나온 유저의 돈을 전송
    }
}

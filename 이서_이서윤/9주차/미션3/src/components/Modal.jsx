import styled from "styled-components";
import useCart from "../store/useCart";
import useModal from "../store/useModal";
const Container=styled.div`
    width:100vw;
    height:100vh;
    background:rgba(0,0,0,0.4);
    position:fixed;
    top:0;
`;
const ModalBox=styled.div`
    width:400px;
    height:150px;
    position:fixed;
    top:40%;
    left:40%;
    background:white;
    div{
        text-align:center;
        margin-top:30px;
        margin-bottom:30px;
    }
    button{
        width:80px;
        height:30px;
        line-height:10px;
        font-size:14px;
        border-radius:10px;
        margin-left:70px;
    }
`;
const LButton = styled.button`
    border:1.5px solid red;
    color:red;
`;
const RButton = styled.button`
    border:1.5px solid blue;
    color:blue;
`;

const Modal=()=>{
    const {allClear}=useCart();
    const {closeModal}=useModal();
    return(
        <Container>
            <ModalBox>
                <div>담아두신 모든 음반을 삭제하시겠습니까?</div>
                <LButton onClick={()=>{
                    allClear();
                    closeModal();
                }}>네
                </LButton>
                <RButton onClick={()=>closeModal()}>아니요</RButton>
            </ModalBox>
        </Container>
    )
}

export default Modal;
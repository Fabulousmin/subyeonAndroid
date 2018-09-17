import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet,ScrollView,View } from 'react-native';
import { Header,Icon} from 'react-native-elements';

 export default class Condition extends Component {
   static navigationOptions = ({ navigation }) => {
     return {header: null}
   }

  render() {
    return (
      <View>
      <Header
      leftComponent=
      {<Icon
        type='Ionicons'
        name='arrow-back'
        color='white'
        onPress={()=>this.props.navigation.navigate('Menu')}
       />}
        centerComponent=
        {
         <Text style={{color:'white',fontFamily:'BMHANNA11yrsold',fontSize:23}}>이용약관</Text>
        }
        backgroundColor='#74b9ff'
      />
    <ScrollView>
    <View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
    <Text style={{fontSize:20}}>서비스 이용약관</Text>
      <Text>수변의 온도는 개인정보 보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보취급방침을 정하여 회원 권익 보호에 최선을 다하고 있습니다. 회사의 개인정보취급방침은 다음과 같은 내용을 담고 있습니다.</Text>
      </View>
<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>1. 수집하는 회원의 개인정보</Text>
<Text>2. 개인정보의 수집 및 이용목적</Text>
<Text>3. 개인정보를 수집하는 방법</Text>
<Text>3. 개인정보를 수집하는 방법</Text>
<Text>4. 개인정보의 취급위탁</Text>
<Text>5. 개인정보의 보유 및 이용기간</Text>
<Text>6. 개인정보 파기절차 및 방법</Text>
<Text>7. 회원 개인정보 정확성을 위한 내용</Text>
<Text>8. 회원의 개인정보안전을 위해 취해질 수 있는 서비스 일시 중단조치</Text>
<Text>9. 제 3 자와의 정보공유 및 제공 관련 내용</Text>
<Text>10. 회원의 개인정보 비밀유지를 위한 내용</Text>
<Text>11. 회원이 자신의 개인정보를 보호하기 위해 알아야 할 사항</Text>
<Text>12. 인지 못한 회원의 개인정보 및 기타 불만사항에 관한 처리</Text>
<Text>13. 개인정보 취급자의 제한에 관한 내용</Text>
<Text>14. 회원 및 법정대리인의 권리와 그 행사방법</Text>
<Text>15. 개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항</Text>
<Text> 16. 개인정보관리책임자 및 담당자의 연락처</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>1. 수집하고 있는 회원의 개인정보</Text>
</View>
<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>가. 수집하는 개인정보의 항목</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>-필수항목: ID(이메일계정), 비밀번호(이메일로 가입시), 성별, 지역, 소속, 등의 정보는 정보주체가 그 수집에 동의하는 경우 수집됩니다.</Text>
<Text>-선택항목: 프로필 키워드 및 기재한 사진 등의 정보는 정보주체가 그 수집에 동의하는 경우 수집됩니다.</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>또한 아래의 항목들에 대해서도 안정된 서비스 제공을 위해 합법적인 절차와 회원의 동의를 거쳐 추가로 수집할 수 있습니다.</Text>
<Text>1) IP Address, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록</Text>
<Text>2) 사용 이동통신사, 계좌번호 등</Text>
<Text>3) 신용카드 결제시: 카드사명, 카드번호 등</Text>
<Text>4) 휴대전화 결제시: 이동전화번호, 통신사, 결제승인번호 등</Text>
<Text>5) 계좌이체로 결제시: 은행명, 계좌번호 등</Text>
<Text>6) 상품권 이용시: 상품권 번호 등</Text>
<Text>7) 서비스 사용 중일 때 귀하의 모바일 기기의 지리적 위치</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>나. 개인정보 수집방법</Text>
<Text>회사는 다음과 같은 방법으로 개인정보를 수집하고 있습니다.</Text>
<Text>- 홈페이지, 모바일앱, 모바일웹, 서면양식, 팩스, 전화, 상담 게시판, 이메일, 이벤트 응모</Text>
<Text>- 협력회사로부터 공동 제휴 및 협력을 통한 정보 수집</Text>
<Text>- 생성정보 수집 툴을 통한 정보 수집</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>2. 개인정보의 수집 및 이용 목적</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>
가. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산에 활용합니다
-컨텐츠 제공, 특정 맞춤 서비스 제공, 본인인증, 구매 및 요금 결제, 요금추심
</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>
나. 회원관리를 위해 일부 회원 정보를 활용합니다
-회원제 서비스 이용 및 인증 서비스에 따른 본인확인, 개인식별, 불량회원(이용약관 제 11조 회원의 의무 각항을 위반하거나 성실히 수행하지 않은 회원)의 부정 이용방지와 비인가 사용방지, 가입의사 확인, 가입 및 가입횟수 제한, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달
</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>
다. 신규 서비스 개발 및 마케팅, 광고에 활용합니다
-신규 서비스 개발 및 인증 서비스, 맞춤서비스 제공, 통계학적 특성에 따른 서비스 제공 및 광고 게재, 이벤트 및 광고성 정보
제공 및 참여기회 제공, 접속빈도 파악, 회원의 서비스이용에 대한 통계, 서비스의 유효성 확인
</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>3. 개인정보를 수집하는 방법</Text>
</View>


<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>
모든 회원이 회사로부터 서비스를 제공받기 위해서는 회원의 개인정보가 필요하며 개인정보는 회원가입 시 회원가입양식에
가입신청자의 동의를 통해 수집됩니다.
</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>4. 개인정보의 취급위탁</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>회사는 동의 없이 귀하의 개인정보를 외부에 위탁처리 하지 않습니다 하지만 서비스 향상 및 안정적인 개인정보 취급을 위해서 귀하의 개인정보를 외부에 위탁하여 처리할 수 있습니다.</Text>
<Text>가. 개인정보의 처리를 위탁하는 경우에는 미리 그 사실을 귀하에게 고지하겠습니다.</Text>
<Text>나. 개인정보의 처리를 위탁하는 경우에는 위탁계약 등을 통하여 서비스제공자의 개인정보보호 관련 지시엄수, 개인정보에
관한 비밀유지, 제3자 제공의 금지 및 사고시의 책임부담 등을 명확히 규정하고 당해 계약내용을 서면 또는 전자적으로 보관하겠습니다.
현재 회원에 대하여 질 높은 서비스 제공 등을 위해 사전에 동의를 획득한 경우에 한하여 아래와 같이 회원의 개인정보를 위탁하고 있습니다.
</Text>
</View>


<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>위탁업무 내용</Text>
<Text>개인정보의 보유 및 이용기간</Text>
<Text>mazon.com, Inc</Text>
<Text>계정 정보 저장</Text>
<Text>회원탈퇴시 혹은 위탁계약 종료시까지</Text>
<Text>카카오톡 알림톡 전송</Text>
<Text>카카오톡 사용 중단 또는 알림톡 수신 거부시</Text>
<Text>MailChimp</Text>
<Text>이메일 전송</Text>
<Text>회원탈퇴시 혹은 위탁계약 종료시까지</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>5. 개인정보의 보유 및 이용기간</Text>
<Text>
회원의 개인정보는 회원가입 후 서비스이용기간이 종료되거나 회원이 계약해지, 탈퇴 등의 사유로 이메일이나 서면을 통해
개인정보 삭제를 요구하는 경우에는 제3자의 열람과 이용이 불가능한 상태로 처리되며, ‘전자상거래 등에서의 소비자보호에
관한 법률’ 제6조(거래기록의 보존 등)에 의하여 아래의 명시 기간 동안 보관관리 합니다.
</Text>
<Text>가. 계약, 청약철회, 회원서비스 제공 등의 거래에 관한 기록: 5년</Text>
<Text>나. 대금결제 및 재화 등의 공급에 관한 기록: 5년</Text>
<Text>다. 소비자 불만 또는 분쟁처리에 관한 기록: 3년</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>6. 개인정보 파기절차 및 방법</Text>
<Text>
회사는 개인정보 보유기간의 경과 혹은 개인정보의 수집 및 이용목적의 달성 등 개인정보가 불필요하게 되었을 때에는 해당
개인정보를 지체 없이 파기합니다.
회사의 개인정보 파기절차 및 방법은 다음과 같습니다.</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>가. 파기절차</Text>
<Text>- 회원이 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 잠금장치가 있는 서류보관함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조)일정 기간 저장된 후 파기됩니다.</Text>
<Text>- 동 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의 다른 목적으로 이용되지 않습니다.</Text>
</View>


<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>나. 파기방법</Text>
<Text>- 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</Text>
<Text>- 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>7. 회원 개인정보 정확성을 위한 내용</Text>
<Text>회사는 회원이 개인정보를 최신의 상태로 유지하도록 정기적으로 갱신을 유도합니다. 일부 정보에 대해서는 정기적으로 확인작업이 이루어 집니다. 회원의 부정확한 개인정보로 인하여 사용상의 불편을 줄 수 있으므로 개인정보 관리자가 판단하기에
확연히 부정확한 개인정보를 기입한 경우에는 정확하지 않은 개인정보를 파기할 수 있습니다.</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>8. 회원의 개인정보안전을 위해 취해질 수 있는 서비스 일시 중단조치</Text>
<Text>회사는 회원의 안전한 서비스 이용을 위해서 최선을 다하고 있습니다. 그러나 원하지 않는 방법에 의하여 회사의 서비스가 훼손을 당하는 경우에는 회원들의 개인정보 보호를 위하여, 문제가 완전하게 해결될 때까지 회원의 개인정보를 이용한 서비스를 일시 중단 할 수도 있습니다.</Text>
</View>


<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>9. 제 3 자와의 정보공유 및 제공 관련</Text>
<Text>
회사는 정보통신망 이용촉진 및 정보보호 등에 관한 법률 제24조의2(개인정보의 제공 동의 등)에 따라 회원의 동의가 있거나 법률에 특별한 규정이 있는 경우를 제외하고 개인정보를 고지 또는 명시한 범위를 초과하여 이용하거나 제3자에게 제공하지 않습니다.
또한 개인정보보호법 제59조(금지행위)에 따라 회사의 서비스 제공을 위하여 개인정보를 취급하거나 취급하였던 자는 다음
각호의 행위를 하지 않습니다.</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>가. 거짓이나 그 밖의 부정한 수단이나 방법으로 개인정보를 취득하거나 처리에 관한 동의를 받는 행위</Text>
<Text>나. 업무상 알게 된 개인정보를 누설하거나 권한 없이 다른 사람이 이용하도록 제공하는 행위</Text>
<Text>다. 정당한 권한 없이 또는 허용된 권한을 초과하여 다른 사람의 개인정보를 훼손, 멸실, 변경, 위조 또는 유출하는 행위</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>10. 회원의 개인정보 비밀유지를 위한 내용</Text>
<Text>회사는 회원의 개인정보의 비밀을 유지하기 위하여 제3자에게는 회원의 동의 없이 개인정보를 유출하지 않습니다. 또한 회원이 동의를 하였다 하더라도, 제3자를 통하여 재유출이 될 확률이 있는 자에게는 회원의 개인정보를 유출하지 않습니다. 회사는 각종 정부기관의 회원 개인정보의 일방적 제공 요구에 대하여는 회원의 개인정보를 제공하지 않습니다. 법령에 따른 정부기관이 법령에 따른 공식 절차를 완벽하게 거쳐 자료를 요구하는 경우에 한하여 회원의 개인정보를 제공합니다. 회사는 회원의 개인정보를 회사가 정한 기본서비스 및 기타의 서비스 활동 이외에는 이용하지 않습니다. 위의 활동에 따라 회원의 정보가 필요할 시에는 별도의 양식을 통한 수집 및 동의의 절차를 거쳐서 회원의 개인정보를 이용합니다.</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>11. 인지 못한 회원의 개인정보 및 기타의 불만사항에 관한 처리</Text>
<Text>회사가 인지하지 못하고 있는 회원의 개인정보 이용 및 기타의 불만사항에 관하여 회원 불만처리를 전담하는 관리자를 배정하여 지속적이고, 신속하게 회원의 불만사항을 처리하고, 처리한 결과에 대하여 즉시 응대합니다.</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>12. 개인정보 취급자의 제한에 관한 내용</Text>
<Text>회사는 제한된 소수의 직원에게만 회원의 개인정보를 취급할 권한을 부여하고, 취급권한을 가진 직원들에게는 개인 아이디(ID)와 비밀번호(Password)를 부여하며, 이를 수시로 변경하여 회원의 개인정보를 보호하는데 최선을 다합니다.</Text>
</View>


<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>13. 회원 및 법정대리인의 권리와 그 행사방법</Text>
<Text>- 회원 및 법정 대리인은 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수 있습니다.</Text>
<Text>- 회원의 개인정보 조회, 수정을 위해서는 '개인정보변경'(또는 '회원정보수정' 등)을, 가입해지(동의철회)를 위해서는 "탈퇴하기"를 통하여 계약 해지 및 탈퇴가 가능합니다.</Text>
<Text>- 혹은 고객센터나 개인정보책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.</Text>
<Text>- 회원이 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지않습니다. 또한 잘못된 개인정보를 제3 자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다.</Text>
<Text>- 회사는 회원 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보를 개인정보취급방침 "5. 개인정보의 보유 및 이용기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>14. 개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항</Text>
<Text>회사는 회원들에게 특화된 맞춤서비스를 제공하기 위해서 회원들의 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버(HTTP)가 회원의 컴퓨터 브라우저에게 보내는 소량의 정보이며 회원들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>가. 쿠키의 사용 목적</Text>
<Text>회원들의 로그인 및 최근접속기록을 토대로 회원 상호간 커뮤니케이션 시의 편리한 기능을 제공하기 위하여 활용됩니다.</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>나. 쿠키의 설치/운영 및 거부</Text>
<Text>- 회원은 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 회원은 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.</Text>
<Text>- 쿠키 설정을 거부하는 방법으로는 회원이 사용하는 웹 브라우저의 옵션을 선택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.</Text>
<Text>- 설정방법 예(인터넷 익스플로어의 경우): 웹 브라우저 상단의 도구 > 인터넷 옵션 > 개인정보</Text>
<Text>- 다만, 쿠키의 저장을 거부할 경우에는 이용에 어려움이 있을 수 있습니다.</Text>
</View>

<View style={{borderBottomWidth: 10,borderColor:'rgb(239,239,244)'}}>
<Text>16. 개인정보관리책임자 및 담당자의 연락처</Text>
<Text>귀하께서는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보 관리담당자 혹은 담당부서로 신고하실 수 있습니다.</Text>
<Text>회사는 회원들의 신고사항에 대해 신속하고 충분한 답변을 드릴 것입니다.</Text>
<Text>• 개인정보 관리책임자</Text>
<Text>• 성명 : 배울</Text>
<Text>• 전화번호 : 01058758863</Text>
<Text>• 메일 : bw0282@naver.com</Text>
<Text>기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.</Text>
<Text>- 개인정보침해신고센터 (www.118.or.kr / 118)</Text>
<Text>- 정보보호마크인증위원회 (www.eprivacy.or.kr / 02-580-0533~4)</Text>
<Text>- 대검찰청 첨단범죄수사과 (www.spo.go.kr / 02-3480-2000)</Text>
<Text>- 경찰청 사이버테러대응센터 (www.ctrc.go.kr / 02-392-0330)</Text>
</View>
  <Text>부칙</Text>
  <Text>1. 본 개인정보취급방침은 2018년 9월 20일 부터 적용됩니다.</Text>
  </ScrollView>
  </View>
    )
  }
}
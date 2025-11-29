/**
 * 약관 내용 상수
 *
 * @description
 * 이용약관, 개인정보처리방침의 JSX 컨텐츠를 관리합니다.
 */

export const TermsContent = () => (
  <div className="prose dark:prose-invert max-w-none">
    <h1 className="text-3xl font-bold mb-6 text-center text-[var(--text-strong)]">
      SumUp 이용약관
    </h1>

    <h2 className="text-2xl font-semibold mt-8 mb-4">제 1 장 총칙</h2>

    <h3 className="text-xl font-semibold mt-6 mb-3">제 1조 (목적)</h3>
    <p className="mb-4">
      본 약관은 후아랩스(이하 "회사")가 제공하는 SumUp 서비스(이하 "서비스")의
      이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을
      목적으로 합니다.
    </p>

    <h3 className="text-xl font-semibold mt-6 mb-3">제 2조 (정의)</h3>
    <p className="mb-3">본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
    <ol className="list-decimal list-inside space-y-2 mb-4">
      <li className="ml-4">
        "서비스"란 프로젝트 관리 및 이슈 추적을 위한 협업 도구 서비스를 의미합니다.
      </li>
      <li className="ml-4">
        "이용자"란 서비스에 접속하여 본 약관에 따라 서비스를 이용하는 회원 및
        비회원을 의미합니다.
      </li>
      <li className="ml-4">
        "회원"이란 서비스에 개인정보를 제공하여 회원등록을 한 자로서, 서비스의
        정보를 지속적으로 제공받으며 서비스를 계속적으로 이용할 수 있는 자를
        의미합니다.
      </li>
      <li className="ml-4">
        "비회원"이란 회원에 가입하지 않고 서비스를 이용하는 자를 의미합니다.
      </li>
      <li className="ml-4">
        "콘텐츠"란 이용자가 서비스를 이용하면서 생성한 프로젝트, 이슈, 댓글 등을
        의미합니다.
      </li>
    </ol>

    <h2 className="text-2xl font-semibold mt-8 mb-4">제 2 장 서비스 제공</h2>

    <h3 className="text-xl font-semibold mt-6 mb-3">제 3조 (서비스의 제공)</h3>
    <p className="mb-4">회사는 다음과 같은 서비스를 제공합니다:</p>
    <ol className="list-decimal list-inside space-y-2 mb-4">
      <li className="ml-4">프로젝트 관리 서비스</li>
      <li className="ml-4">이슈 추적 및 관리 서비스</li>
      <li className="ml-4">팀 협업 도구</li>
      <li className="ml-4">기타 회사가 정하는 서비스</li>
    </ol>

    <h3 className="text-xl font-semibold mt-6 mb-3">제 4조 (서비스 이용시간)</h3>
    <p className="mb-4">
      서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. 다만, 회사는
      서비스의 안정적인 제공을 위해 정기점검, 시스템 업그레이드 등의 사유로
      서비스를 일시 중단할 수 있습니다.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-4">제 3 장 이용계약</h2>

    <h3 className="text-xl font-semibold mt-6 mb-3">
      제 5조 (이용계약의 성립)
    </h3>
    <ol className="list-decimal list-inside space-y-2 mb-4">
      <li className="ml-4">
        이용계약은 이용자의 약관 동의와 이용신청에 대한 회사의 승낙으로
        성립합니다.
      </li>
      <li className="ml-4">
        회사는 이용신청에 대하여 승낙함을 원칙으로 하되, 다음 각 호에 해당하는
        경우에는 승낙을 하지 않을 수 있습니다.
      </li>
      <li className="ml-4">
        회사는 이용신청에 대한 승낙을 하지 않거나 유보한 경우, 그 사유를 이용자에게
        알려야 합니다.
      </li>
    </ol>

    <h2 className="text-2xl font-semibold mt-8 mb-4">제 4 장 이용자의 의무</h2>

    <h3 className="text-xl font-semibold mt-6 mb-3">제 6조 (이용자의 의무)</h3>
    <p className="mb-3">이용자는 다음 행위를 하여서는 안 됩니다:</p>
    <ol className="list-decimal list-inside space-y-2 mb-4">
      <li className="ml-4">신청 또는 변경 시 허위내용의 등록</li>
      <li className="ml-4">타인의 정보 도용</li>
      <li className="ml-4">회사가 게시한 정보의 변경</li>
      <li className="ml-4">
        회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시
      </li>
      <li className="ml-4">
        회사 기타 제3자의 저작권 등 지적재산권에 대한 침해
      </li>
      <li className="ml-4">
        회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
      </li>
      <li className="ml-4">
        외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를
        서비스에 공개 또는 게시하는 행위
      </li>
    </ol>

    <h2 className="text-2xl font-semibold mt-8 mb-4">
      제 5 장 서비스 이용 제한
    </h2>

    <h3 className="text-xl font-semibold mt-6 mb-3">제 7조 (서비스 이용 제한)</h3>
    <p className="mb-4">
      회사는 이용자가 본 약관의 의무를 위반하거나 서비스의 정상적인 운영을
      방해한 경우, 경고, 일시정지, 영구이용정지 등으로 서비스 이용을 단계적으로
      제한할 수 있습니다.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-4">
      제 6 장 손해배상 및 면책
    </h2>

    <h3 className="text-xl font-semibold mt-6 mb-3">제 8조 (손해배상)</h3>
    <p className="mb-4">
      회사는 무료로 제공되는 서비스와 관련하여 회원에게 어떠한 손해가 발생하더라도
      동 손해가 회사의 고의 또는 중대한 과실에 의한 경우를 제외하고는 이에 대하여
      책임을 부담하지 아니합니다.
    </p>

    <h3 className="text-xl font-semibold mt-6 mb-3">제 9조 (면책사항)</h3>
    <p className="mb-4">
      회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수
      없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-4">제 7 장 지적재산권</h2>

    <h3 className="text-xl font-semibold mt-6 mb-3">제 10조 (콘텐츠의 소유권)</h3>
    <p className="mb-4">
      이용자가 서비스를 이용하면서 생성한 프로젝트, 이슈, 댓글 등에 대한
      저작권은 이용자에게 있습니다. 다만, 회사는 서비스 제공을 위해 필요한 범위
      내에서 해당 콘텐츠를 이용할 수 있습니다.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-4">제 8 장 분쟁해결</h2>

    <h3 className="text-xl font-semibold mt-6 mb-3">
      제 11조 (준거법 및 관할법원)
    </h3>
    <p className="mb-4">
      서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 회사의 본사 소재지를
      관할하는 법원을 전속 관할 법원으로 합니다.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-4">부칙</h2>
    <p className="mb-4">
      본 약관은 2025년 1월 1일부터 시행합니다. 본 약관의 개정이 필요한 경우,
      회사는 관련 법령에 따라 개정된 약관을 서비스 내 공지사항을 통해 공지합니다.
    </p>
  </div>
);

export const PrivacyContent = () => (
  <div className="prose dark:prose-invert max-w-none">
    <h1 className="text-3xl font-bold mb-6 text-center text-[var(--text-strong)]">
      SumUp 개인정보처리방침
    </h1>
    <p className="mb-6">
      후아랩스(이하 "회사")는 「개인정보 보호법」, 「정보통신망 이용촉진 및
      정보보호 등에 관한 법률」 등 관련 법령에 따라 이용자의 개인정보를 보호하고
      이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이
      개인정보처리방침을 수립·공개합니다.
    </p>

    <h3 className="text-xl font-semibold mt-6 mb-3">
      제 1조 (개인정보의 처리목적)
    </h3>
    <p className="mb-3">회사는 다음의 목적을 위하여 개인정보를 처리합니다:</p>
    <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
      <li>서비스 제공 및 계약 이행</li>
      <li>회원 식별 및 본인 확인</li>
      <li>프로젝트 관리 및 협업 서비스 제공</li>
      <li>서비스 개선 및 신규 서비스 개발</li>
      <li>고객 문의 및 불만 처리</li>
      <li>법령에 따른 의무 이행</li>
    </ul>

    <h3 className="text-xl font-semibold mt-6 mb-3">
      제 2조 (개인정보의 수집 항목)
    </h3>
    <p className="mb-3">회사는 다음의 개인정보를 수집합니다:</p>
    <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
      <li>
        <strong>필수항목:</strong> 이메일, 이름, 프로젝트 정보, 이슈 정보
      </li>
      <li>
        <strong>선택항목:</strong> 프로필 사진, 생년월일
      </li>
      <li>
        <strong>자동수집항목:</strong> IP주소, 접속기록, 서비스 이용기록, 기기정보
      </li>
    </ul>

    <h3 className="text-xl font-semibold mt-6 mb-3">
      제 3조 (개인정보의 수집 방법)
    </h3>
    <p className="mb-3">회사는 다음과 같은 방법으로 개인정보를 수집합니다:</p>
    <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
      <li>회원가입 및 서비스 이용 과정에서 이용자가 직접 입력</li>
      <li>소셜 로그인(카카오, 구글)을 통한 자동 수집</li>
      <li>서비스 이용 과정에서 자동으로 생성되는 정보 수집</li>
      <li>고객센터를 통한 상담 과정에서 수집</li>
    </ul>

    <h3 className="text-xl font-semibold mt-6 mb-3">
      제 4조 (개인정보의 처리 및 보유기간)
    </h3>
    <p className="mb-3">
      회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를
      수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다:
    </p>
    <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
      <li>
        <strong>회원가입 정보:</strong> 회원 탈퇴 시까지
      </li>
      <li>
        <strong>프로젝트 정보:</strong> 회원 탈퇴 시까지
      </li>
      <li>
        <strong>서비스 이용 기록:</strong> 3년간 보관
      </li>
      <li>
        <strong>고객 문의 기록:</strong> 3년간 보관
      </li>
    </ul>

    <h3 className="text-xl font-semibold mt-6 mb-3">
      제 5조 (개인정보의 제3자 제공)
    </h3>
    <p className="mb-4">
      회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의
      경우에는 예외로 합니다:
    </p>
    <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
      <li>이용자들이 사전에 동의한 경우</li>
      <li>
        법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라
        수사기관의 요구가 있는 경우
      </li>
    </ul>

    <h3 className="text-xl font-semibold mt-6 mb-3">
      제 6조 (개인정보 처리의 위탁)
    </h3>
    <p className="mb-3">
      회사는 서비스 제공을 위해 다음과 같이 개인정보 처리를 위탁하고 있습니다:
    </p>
    <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
      <li>
        <strong>Supabase:</strong> 데이터베이스 및 인증 서비스 제공
      </li>
      <li>
        <strong>Vercel:</strong> 웹 서비스 호스팅
      </li>
    </ul>

    <h3 className="text-xl font-semibold mt-6 mb-3">제 7조 (정보주체의 권리)</h3>
    <p className="mb-3">
      이용자는 언제든지 다음 사항에 대한 열람, 정정·삭제, 처리정지 요구 등의
      권리를 행사할 수 있습니다:
    </p>
    <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
      <li>회사가 처리하는 이용자 본인의 개인정보</li>
      <li>회사가 이용자의 개인정보를 이용하거나 제3자에게 제공한 현황</li>
      <li>회사가 이용자에게 개인정보 처리를 정지한 현황</li>
    </ul>

    <h3 className="text-xl font-semibold mt-6 mb-3">
      제 8조 (개인정보의 안전성 확보조치)
    </h3>
    <p className="mb-3">
      회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
    </p>
    <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
      <li>
        개인정보 암호화: 민감정보는 암호화하여 저장
      </li>
      <li>접근 제한: 개인정보에 대한 접근 권한을 최소한으로 제한</li>
      <li>
        보안 프로그램: 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 방지
      </li>
      <li>정기 감사: 개인정보 처리 현황을 정기적으로 점검</li>
    </ul>

    <h3 className="text-xl font-semibold mt-6 mb-3">
      제 9조 (개인정보 보호책임자)
    </h3>
    <p className="mb-3">
      회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한
      정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보
      보호책임자를 지정하고 있습니다:
    </p>
    <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
      <li>
        <strong>개인정보 보호책임자:</strong> 후아랩스 개인정보보호팀
      </li>
      <li>
        <strong>연락처:</strong> privacy@hua-labs.com
      </li>
      <li>
        <strong>문의시간:</strong> 평일 09:00~18:00 (주말, 공휴일 제외)
      </li>
    </ul>

    <h3 className="text-xl font-semibold mt-6 mb-3">부칙</h3>
    <p className="mb-4">
      본 개인정보처리방침은 2025년 1월 1일부터 시행합니다. 본 방침의 개정이 필요한
      경우, 회사는 관련 법령에 따라 개정된 방침을 서비스 내 공지사항을 통해
      공지합니다.
    </p>
  </div>
);


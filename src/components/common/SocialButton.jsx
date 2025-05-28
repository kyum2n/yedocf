const SocialButton = ({ platform, onClick }) => {
    const platforms = {
        kakao: {
            name: "K",
            bgColor: "bg-[#FEE500]",
            textColor: "text-[#3C1E1E]",
        },
        naver: {
            name: "N",
            bgColor: "bg-[#03C75A]",
            textColor: "text-white",
        },
        google: {
            name: "G",
            bgColor: "bg-white",
            textColor: "text-[#3C4043]",
            border: "border border-[#DADCE0]",
        },
    };

    const { name, bgColor, textColor, border } = platforms[platform] || {};

    return (
        <button
            onClick={onClick}
            className={`w-16 h-16 rounded-full font-semibold flex-center gap-2 shadow-md ${bgColor} ${textColor} ${border ?? ""}`}
        >
            {name}
        </button>
    );
};

export default SocialButton;

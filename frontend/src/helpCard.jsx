import book from "./assets/book.png"; 


const HelpCard = ({img=book, heading="leo", content="choco"}) => {
    return (
        <div className="helpCard border border-[#16A085]  shadow-xl shadow-black/35 rounded-lg w-[17rem] h-[19rem] p-[1rem] bg-[#ECF0F1] hover:cursor-pointer hover:bg-[#d9e7e3]">
            <div>
                <img src={img} alt={heading} className="w-[5rem] h-[5rem]  mb-0"/>
            </div>
            <div className="pt-8">
                <h3 className="text-xl font-semibold py-2 text-[#2C3E50]">{heading}</h3>
                <p className="text-sm pt-2 text-[#34495E]">{content}</p>
            </div>
            
        </div>
    );
}

export default HelpCard;
type ResultModalProps = {
    message: string;
    onClose: () => void;
}

function ResultModal(props: ResultModalProps) {

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-linear-to-b from-zinc-900 via-zinc-800 to-zinc-700 w-150 h-80 rounded-lg flex flex-col items-center justify-center text-white gap-10 font-bold">
            <div className="text-3xl">{props!.message}</div>

            <button className="w-40 h-15 rounded-lg bg-linear-to-b shadow-[0_8px_20px_rgba(0,0,0,0.6)] from-red-400 via-red-600 to-red-800 text-[20px]"
                onClick={props.onClose}
            >
                会話を続ける
            </button>
            </div>
        </div>
    )
}
export default ResultModal;
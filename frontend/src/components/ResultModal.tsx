type ResultModalProps = {
    message: string;
    onClose: () => void;
}

function ResultModal(props: ResultModalProps) {

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-fuchsia-500/90 w-96 h-48 rounded-lg flex flex-col items-center justify-center">
            {props!.message}

            <button
                onClick={props.onClose}
            >
                会話を続ける
            </button>
            </div>
        </div>
    )
}
export default ResultModal;
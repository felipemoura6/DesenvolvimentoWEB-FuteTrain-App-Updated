import soccerImage from '../assets/images/soccer.jpg'; // Importe a imagem

export function ContentTraining() {
    return(
        <div className="bg-gradient-to-t from-green-950/50 to-green-900/50 relative h-screen w-full overflow-y-auto pb-10rem">
            <div className="absolute inset-0 bg-center" style={{backgroundImage: `url(${soccerImage})`, opacity: '0.5'}}></div>
            <div className="h-px bg-gray-200 mb-1"></div>
            <div className="p-4">
                <h2 className="left-auto right-auto justify-center flex mb-2 text-green-950 text-bold font-bold text-lg">Start your training!</h2>
            </div>
        </div>
    )
}

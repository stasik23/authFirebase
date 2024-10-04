const images: string[] = [
    "https://t3.ftcdn.net/jpg/05/60/66/12/360_F_560661275_UE6w3cvv8nUgocNEBm0FI1ML6noUId3b.jpg",
    "https://png.pngtree.com/png-vector/20210422/ourmid/pngtree-sit-down-pet-dog-waleski-png-image_3234129.jpg",
    "https://img.lovepik.com/free-png/20211124/lovepik-dog-png-image_401102320_wh1200.png",
    "https://w7.pngwing.com/pngs/944/32/png-transparent-puppy-puppy-animal-puppy-clipart.png"
]

export const NotFound = () => {
    const randomImage = images[Math.floor(Math.random() * images.length)];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-8">
            <h1 className="text-9xl font-bold text-gray-700 mb-4">
                SORRY
            </h1>
            <p className="text-2xl text-gray-500 mb-8">
                We couldn’t find that page
            </p>
            <a href="/home" className="text-xl mb-8">
                But you can pet a dog.
                <div className="flex flex-col items-center">
                    <img
                        className="appearance-none w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        src={randomImage}
                        alt="Cute dog"
                    />
                </div>
            </a>

        </div>

    )
}

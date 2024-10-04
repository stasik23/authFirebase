export const NotAuthorized = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className="flex flex-col items-center space-y-4">
                <h1 className='text-4xl'>Not Auth</h1>
                <a href='/register' className='hover:scale-125'>Register</a>
                <a href='/login' className='hover:scale-125'>Login</a>
                <img src="https://memi.klev.club/uploads/posts/2024-04/memi-klev-club-r001-p-memi-negr-s-arbuzom-na-golove-1.jpg" alt="" />
            </div>
        </div>
    )
}

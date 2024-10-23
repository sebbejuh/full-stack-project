
const HeroSection = () => {
  return (
    <div className='border-b border-neutral-900 pb-4 lg:mb35'>
      <div className='flex flex-wrap'>
        <div className='w-full lg:w-1/2'>
          <div className='flex flex-col items-center lg:items-start'>
            <h1 className='pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl'>Sebastian Locksenius</h1>
            <span className='bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent'>Frontend Developer</span>
            <p className='my-2 max-w-xl py-6 font-light tracking-tighter'>Developer with skills across the stack.
              I take pride in my work and communicate
              effectively in both my native Swedish and
              in English. My experience includes
              working collaboratively in teams, often
              using agile project management
              methods. I am passionate about problemsolving and keeping up to date with new
              technologies and concepts</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
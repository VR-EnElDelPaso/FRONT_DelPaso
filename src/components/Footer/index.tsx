
import { IoCall } from 'react-icons/io5';
import SocialMediaIcons from '../SocialMediaIcons/SocialMediaIcons';
import { FadeInOnScroll } from '../animations/FadeInOnScroll';

export default function Footer() {

  return (

    <div className="bg-secondary overflow-hidden font-inter text-white">
      <FadeInOnScroll from='bottom' distance={20} duration={2}>
        <div className='auto px-8 pt-8 container mx-auto'>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-x-8 md:gap-y-16 sm:gap-10">
            <div className='md:order-4 lg:order-1'>
              <h4 className="text-xl font-semibold">Horario</h4>
              <div className='h-full flex items-center'>
                <ul className='list-disc pl-5 space-y-2'>
                  <li>
                    <p><span className='font-semibold'>Lunes:</span> cerrado</p>
                  </li>
                  <li>
                    <p><span className='font-semibold'>Martes - Sábado:</span>  10 a.m. - 2 p.m. <br /> / 5 p.m. - 8 p.m.</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className='md:order-2 lg:order-2'>
              <h4 className="font-semibold text-xl">Redes sociales</h4>
              <div className='h-full flex items-center'>
                <SocialMediaIcons containerClass="flex pl-2" iconClass="text-3xl" />
              </div>
            </div>
            <div className='md:order-1 lg:order-3'>
              <h4 className="font-semibold text-xl">Contacto</h4>
              <div className='h-full flex items-center'>
                <IoCall className='ml-4 mr-2 text-3xl' />
                <p> 312 307 0289</p>
              </div>
            </div>
            <div className='md:order-3 lg:order-4'>
              <h4 className="text-xl font-semibold">Ubicación</h4>
              <div className='p-4'>
                <p>C. 27 de Septiembre No. 119, Centro, C.P. 28000, Colima, Colima, México</p>
                <iframe className='md:w-3/4 w-full rounded-xl mt-4' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d941.7221742361119!2d-103.72468924398711!3d19.24368197467158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84255aac6a222821%3A0x69cd49bd530cb8d0!2sMuseo%20Universitario%20Fernando%20del%20Paso!5e0!3m2!1sen!2smx!4v1718795745682!5m2!1sen!2smx" loading="eager"></iframe>
              </div>
            </div>
          </div>
          <hr className='my-4'/>
          <div className='py-2 flex justify-between items-center md:flex-row flex-col md:gap-10 gap-4'>
            <div className='lg:max-w-[600px] md:max-w-[400px]'>
              <img src="/assets/images/identity/pleca2023.png" alt="" />
            </div>
            <div  className='text-center lg:text-base text-xs lg:max-w-3xl md:max-w-[400px]'>
              <p>© 2023 Museo Universitario Fernando del Paso. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </FadeInOnScroll >
    </div >
  )
}


import SocialMediaIcons from '../SocialMediaIcons/SocialMediaIcons';
import { FadeInOnScroll } from '../animations/FadeInOnScroll';
import { ZoomInOnScroll } from '../animations/ZoomInOnScroll';

export default function Footer() {



  return (
    <div className="bg-secondary font-inter text-white py-4 lg:px-[225px] px-10 flex justify-center">
      <div className='max-w-[1000px]'>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
          <FadeInOnScroll from='left' distance={30}>
            <h4 className="font-semibold">Ubicación</h4>
            <p>C. 27 de Septiembre No. 119, Centro, C.P. 28000, Colima, Colima, México</p>
            <iframe className='md:w-3/4 w-full rounded-xl mt-4' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d941.7221742361119!2d-103.72468924398711!3d19.24368197467158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84255aac6a222821%3A0x69cd49bd530cb8d0!2sMuseo%20Universitario%20Fernando%20del%20Paso!5e0!3m2!1sen!2smx!4v1718795745682!5m2!1sen!2smx" loading="eager"></iframe>
          </FadeInOnScroll>
          <div>
            <FadeInOnScroll from='right' distance={30}>
              <div>
                <h4 className="font-bold font-">Horario</h4>
                <ul className='list-disc pl-5 space-y-2'>
                  <li>
                    <p><span className='font-semibold'>Lunes:</span> cerrado</p>
                  </li>
                  <li>
                    <p><span className='font-semibold'>Martes - Sábado:</span>  10 a.m. - 2 p.m. / 5 p.m. - 8 p.m.</p>
                  </li>
                </ul>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll from='right' distance={30}>
              <h4 className="font-semibold">Redes sociales</h4>
              <SocialMediaIcons containerClass="flex pl-2" iconClass="text-3xl" />
            </FadeInOnScroll>
            <FadeInOnScroll from='right' distance={30}>
              <h4 className="font-semibold">Contacto</h4>
              <p className='pl-4'>312 307 0289</p>
            </FadeInOnScroll>
          </div>
        </div>
        <ZoomInOnScroll className="pt-10" initialScale={.9}>
          <img src="/assets/images/identity/pleca2023.png" alt="" />
        </ZoomInOnScroll>
      </div>
    </div>
  )
}

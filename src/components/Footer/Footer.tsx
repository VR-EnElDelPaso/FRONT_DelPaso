import { IoCall } from 'react-icons/io5';
import SocialMediaIcons from '../SocialMediaIcons/SocialMediaIcons';
import { FadeInOnScroll } from '../animations/FadeInOnScroll';

export default function Footer() {
  return (
    <div className="bg-secondary overflow-hidden font-inter text-white">
      <FadeInOnScroll from='bottom' distance={20} duration={2}>
        <div className='container mx-auto px-8 pt-8'>
          <div className="flex justify-around flex-wrap gap-8">
            {/* Horarios y Precios juntos */}
            <div className='space-y-6'>
              <div>
                <h4 className="text-xl font-semibold mb-4">Horarios</h4>
                <ul className='space-y-2'>
                  <li><strong>• Lunes:</strong> Cerrado</li>
                  <li><strong>• Martes - Sábado:</strong> 10 a.m. - 2 p.m. / 5 p.m. - 8 p.m.</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4">Cuota de recuperación</h4>
                <ul className='space-y-2'>
                  <li><strong>• Estudiantes:</strong> 50.00 MXN</li>
                  <li><strong>• Público General:</strong> 80.00 MXN</li>
                </ul>
              </div>
            </div>

            {/* Redes Sociales y Contacto */}
            <div className='space-y-6'>
              <div>
                <h4 className="text-xl font-semibold mb-4">Redes sociales</h4>
                <SocialMediaIcons containerClass="flex gap-4" iconClass="text-3xl" />
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">Contacto</h4>
                <div className='flex items-center gap-2'>
                  <span className='flex gap-2'>
                    <IoCall className='text-2xl' />
                    312 307 0289
                  </span>
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div className='max-w-[400px]'>
              <h4 className="text-xl font-semibold mb-4">Ubicación</h4>
              <p className='mb-4'>C. 27 de Septiembre No. 119, Centro, C.P. 28000, Colima, Colima, México</p>
              <iframe 
                className='w-full rounded-lg h-[150px]' 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d941.7221742361119!2d-103.72468924398711!3d19.24368197467158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84255aac6a222821%3A0x69cd49bd530cb8d0!2sMuseo%20Universitario%20Fernando%20del%20Paso!5e0!3m2!1sen!2smx!4v1718795745682!5m2!1sen!2smx"
                loading="lazy"
              />
            </div>
          </div>

          <div className='mt-8 py-4 border-t border-white/20'>
            <div className="flex items-center justify-center">              
              <div className='text-sm text-white/80'>
                <p>© 2024, Museo Universitario Fernando del Paso. Todos los derechos reservados</p>
              </div>
            </div>
          </div>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
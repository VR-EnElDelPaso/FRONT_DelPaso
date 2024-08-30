export const dateFormatter = (dateString: string): string => {
    const months: string[] = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
  
    const date: Date = new Date(dateString);
  
    const day: string = date.getDate().toString().padStart(2, '0');
    const month: string = months[date.getMonth()];
    const year: number = date.getFullYear();
  
    return `${day} de ${month} de ${year}`;
}
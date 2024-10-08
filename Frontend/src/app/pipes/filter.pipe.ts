import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'appFilter'
})
export class FilterPipe implements PipeTransform {
 

transform(items: any[], searchText: string): any[] {
  if (!items) {
    return [];
  }

  if (!searchText) {
    return items;
  }
  

  searchText = searchText.toLocaleLowerCase()

  return items.filter(item => {
    return Object.values(item).some(value => 
      typeof value === 'string' && value.toLocaleLowerCase().includes(searchText)
    );
  });
}
}
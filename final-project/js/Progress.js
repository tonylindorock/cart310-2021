// this is the base class for all progress bars
class Progress{
  constructor(start, current, end, step = 1){
    this.startValue = start;
    this.value = current;
    this.endValue = end;
    this.step = step;

    this.complete = false;
  }

  advance(num){
    let buffer = (this.value + this.step * num) - this.endValue;
    if (int(buffer) <= 0){
      this.value += this.step * num;
      if (int(buffer) === 0){
        this.complete = true;
      }
    }else{
      this.complete = true;
      this.value = buffer;
    }
  }

  getConvertedValue(newStart, newEnd){
    return map(this.value,this.startValue,this.endValue,newStart,newEnd,true);
  }
}

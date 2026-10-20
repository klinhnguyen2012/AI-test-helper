import {renderToString} from 'katex';
export default function MathText({text}:{text:string}){
 const parts=text.split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+\$)/g);
 return <>{parts.map((part,index)=>part.startsWith('$')?<span key={index} dangerouslySetInnerHTML={{__html:renderToString(part.replace(/^\$\$|\$\$$|^\$|\$$/g,''),{displayMode:part.startsWith('$$'),throwOnError:false})}}/>:part)}</>;
}

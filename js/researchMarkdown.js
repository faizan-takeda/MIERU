'use strict';
((root,build)=>{
 const renderer=build(typeof module==='object'&&module.exports?require('markdown-it'):root.markdownit);
 if(typeof module==='object'&&module.exports)module.exports=renderer;else root.MieruResearchMarkdown=renderer;
})(typeof window==='undefined'?globalThis:window,MarkdownIt=>{
 const parser=new MarkdownIt({html:false,linkify:false,typographer:false});
 parser.validateLink=value=>{try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password;}catch{return false;}};
 parser.renderer.rules.image=(tokens,index)=>parser.utils.escapeHtml(tokens[index].content);
 parser.renderer.rules.link_open=(tokens,index,options,environment,renderer)=>{
  tokens[index].attrSet('target','_blank');tokens[index].attrSet('rel','noopener noreferrer');
  return renderer.renderToken(tokens,index,options);
 };
 for(const kind of ['heading_open','heading_close'])parser.renderer.rules[kind]=(tokens,index,options,environment,renderer)=>{
  tokens[index].tag='h'+Math.min(6,Math.max(3,Number(tokens[index].tag.slice(1))+1));
  return renderer.renderToken(tokens,index,options);
 };
 parser.renderer.rules.table_open=()=>'<div class="research-table" role="region" aria-label="Research comparison" tabindex="0"><table>\n';
 parser.renderer.rules.table_close=()=>'</table></div>\n';
 parser.inline.ruler.after('link','research_reference',(state,silent)=>{
  if(state.linkLevel>0)return false;
  const match=/^\[(\d{1,3})\]/.exec(state.src.slice(state.pos));
  if(!match||Number(match[1])<1||Number(match[1])>state.env.sourceCount)return false;
  if(!silent){const token=state.push('research_reference','a',0);token.meta=Number(match[1]);}
  state.pos+=match[0].length;return true;
 });
 parser.renderer.rules.research_reference=(tokens,index)=>{
  const number=tokens[index].meta;
  return `<a class="research-cite" href="#research-source-${number}" aria-label="Source ${number}">[${number}]</a>`;
 };
 return {render:(text,citations=[])=>parser.render(String(text||''),{sourceCount:citations.length})};
});
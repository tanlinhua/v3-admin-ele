import{d as e,r as l,e as a,a1 as o,l as r,R as t,m as i,v as d,c as n,w as s,s as c,T as u,U as m,V as f,n as p,x as _,a as g,Q as h,L as b,a2 as v,a3 as y,a4 as k}from"./index-73e8d8c6.js";import{P as V}from"./index-4ffd8671.js";const w=g("查询"),C=g("新增"),x=g("编辑"),P=g("删除"),U={class:"dialog-footer"},z=g("取消"),E=g("提交"),j=e({name:"PermissionRole"}),K=Object.assign(j,{setup(e){const g=l({loading:!0,search:"",list:[],currentPage:1,pageSize:15}),j=()=>{g.loading=!0,h({page:g.currentPage,limit:g.pageSize,search:g.search}).then((e=>{g.count=e.count,g.list=e.data,g.loading=!1})).catch((()=>{g.loading=!1}))},K=a(null),R=a(null),S=l({visible:!1,loading:!1,form:{id:"",role_name:"",role_desc:""},rules:{role_name:[{required:!0,validator:(e,l,a)=>{""===l?a(new Error("角色名称为必填字段")):/^.{1,40}$/.test(l)?a():a(new Error("角色名称长度必须小于40个字符"))},trigger:"change"}],role_desc:[{required:!0,validator:(e,l,a)=>{""===l?a(new Error("角色描述为必填字段")):/^.{1,40}$/.test(l)?a():a(new Error("角色描述长度必须小于40个字符"))},trigger:"change"}]},list:[]});o({roleid:0}).then((e=>{S.list=e.data})).catch((()=>{}));const q=()=>{S.form={id:"",role_name:"",role_desc:""},S.visible=!0,S.loading=!1,b((()=>{K.value.clearValidate(),R.value.setCheckedKeys([],!1)}))},N=()=>{const e=R.value.getHalfCheckedKeys().concat(R.value.getCheckedKeys(!1)).join(",");K.value.validate((l=>{if(!l)return!1;S.loading=!0,S.form.id?y({id:S.form.id,role_name:S.form.role_name,role_desc:S.form.role_desc,per_id:e}).then((()=>{S.visible=!1,j()})).catch((()=>{S.loading=!1})):v({role_name:S.form.role_name,role_desc:S.form.role_desc,per_id:e}).then((()=>{S.visible=!1,j()})).catch((()=>{S.loading=!1}))}))};return j(),(e,l)=>{const a=r("el-input"),o=r("el-form-item"),h=r("el-button"),v=r("el-form"),y=r("el-table-column"),$=r("el-popconfirm"),D=r("el-table"),H=r("el-tree"),I=r("el-dialog"),L=t("loading");return i(),d("div",null,[n(v,{inline:!0},{default:s((()=>[n(o,{label:"角色名称"},{default:s((()=>[n(a,{modelValue:g.search,"onUpdate:modelValue":l[0]||(l[0]=e=>g.search=e),placeholder:"支持模糊查询",clearable:"",style:{width:"150px"}},null,8,["modelValue"])])),_:1}),n(o,null,{default:s((()=>[n(h,{type:"primary",icon:c(u),onClick:j},{default:s((()=>[w])),_:1},8,["icon"]),n(h,{type:"success",icon:c(m),onClick:q},{default:s((()=>[C])),_:1},8,["icon"])])),_:1})])),_:1}),f((i(),p(D,{data:g.list,border:"",style:{width:"100%"}},{default:s((()=>[n(y,{prop:"id",label:"ID"}),n(y,{prop:"role_name",label:"角色名称"}),n(y,{prop:"role_desc",label:"描述"}),n(y,{label:"操作",fixed:"right",width:"140"},{default:s((({row:e})=>[n(h,{type:"primary",size:"small",onClick:l=>(e=>{S.form={id:e.id,role_name:e.role_name,role_desc:e.role_desc},S.visible=!0,S.loading=!1,b((()=>{K.value.clearValidate(),R.value.setCheckedKeys([],!1),e.per_id.split(",").forEach((e=>{e&&!R.value.getNode(e).childNodes.length&&R.value.setChecked(e,!0)}))}))})(e)},{default:s((()=>[x])),_:2},1032,["onClick"]),n($,{title:"确定删除吗?",onConfirm:l=>{return a=e.id,g.loading=!0,void k({id:a}).then((()=>{})).catch((()=>{})).finally((()=>{j()}));var a}},{reference:s((()=>[n(h,{type:"danger",size:"small"},{default:s((()=>[P])),_:1})])),_:2},1032,["onConfirm"])])),_:1})])),_:1},8,["data"])),[[L,g.loading]]),n(V,{page:g.currentPage,"onUpdate:page":l[1]||(l[1]=e=>g.currentPage=e),limit:g.pageSize,"onUpdate:limit":l[2]||(l[2]=e=>g.pageSize=e),total:g.count,onPagination:j},null,8,["page","limit","total"]),n(I,{modelValue:S.visible,"onUpdate:modelValue":l[6]||(l[6]=e=>S.visible=e),title:S.form.id?"编辑权限":"新增角色",width:"340px"},{footer:s((()=>[_("span",U,[n(h,{onClick:l[5]||(l[5]=e=>S.visible=!1)},{default:s((()=>[z])),_:1}),n(h,{type:"primary",loading:S.loading,onClick:N},{default:s((()=>[E])),_:1},8,["loading"])])])),default:s((()=>[n(v,{ref_key:"formtRef",ref:K,model:S.form,rules:S.rules,"label-width":"80px"},{default:s((()=>[n(o,{label:"角色名称",prop:"role_name"},{default:s((()=>[n(a,{modelValue:S.form.role_name,"onUpdate:modelValue":l[3]||(l[3]=e=>S.form.role_name=e),placeholder:"小于40字符",style:{width:"200px"}},null,8,["modelValue"])])),_:1}),n(o,{label:"角色描述",prop:"role_desc"},{default:s((()=>[n(a,{modelValue:S.form.role_desc,"onUpdate:modelValue":l[4]||(l[4]=e=>S.form.role_desc=e),placeholder:"小于40字符",style:{width:"200px"}},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules"]),n(H,{ref_key:"treeRef",ref:R,data:S.list,"show-checkbox":"","node-key":"id","default-expand-all":"",props:{label:"title",children:"children"}},null,8,["data"])])),_:1},8,["modelValue","title"])])}}});export{K as default};

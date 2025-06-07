<template>
    <div class="addEdit-block">
        <el-form
                class="detail-form-content"
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                label-width="auto"
                >
            <el-row>
                <el-col :span="12"  v-if="sessionTable !='shangjia'">
                    <el-form-item class="select" v-if="type!='info'"  label="商家" prop="shangjiaId">
                        <el-select v-model="ruleForm.shangjiaId" :disabled="ro.shangjiaId" filterable placeholder="请选择商家" @change="shangjiaChange">
                            <el-option
                                    v-for="(item,index) in shangjiaOptions"
                                    v-bind:key="item.id"
                                    :label="item.shangjiaName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12"  v-if="sessionTable !='shangjia' ">
                    <el-form-item class="input" v-if="type!='info'"  label="商家名称" prop="shangjiaName">
                        <el-input v-model="shangjiaForm.shangjiaName"
                                  placeholder="商家名称" clearable readonly></el-input>
                    </el-form-item>
                    <div v-else-if="type=='info'">
                        <el-form-item class="input" label="商家名称" prop="shangjiaName">
                            <el-input v-model="ruleForm.shangjiaName"
                                      placeholder="商家名称" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <input id="updateId" name="id" type="hidden">
            <input id="shangjiaId" name="shangjiaId" type="hidden">
               <el-col :span="12">
                   <el-form-item class="input" v-if="type!='info'"  label="兼职名称" prop="jianzhiName">
                       <el-input v-model="ruleForm.jianzhiName"
                                 placeholder="兼职名称" clearable  :readonly="ro.jianzhiName"></el-input>
                   </el-form-item>
                   <div v-else-if="type=='info'">
                       <el-form-item class="input" label="兼职名称" prop="jianzhiName">
                           <el-input v-model="ruleForm.jianzhiName"
                                     placeholder="兼职名称" readonly></el-input>
                       </el-form-item>
                   </div>
               </el-col>
               <el-col :span="12">
                   <el-form-item class="input" v-if="type!='info'"  label="兼职编号" prop="jianzhiUuidNumber">
                       <el-input v-model="ruleForm.jianzhiUuidNumber"
                                 placeholder="兼职编号" clearable  :readonly="ro.jianzhiUuidNumber"></el-input>
                   </el-form-item>
                   <div v-else-if="type=='info'">
                       <el-form-item class="input" label="兼职编号" prop="jianzhiUuidNumber">
                           <el-input v-model="ruleForm.jianzhiUuidNumber"
                                     placeholder="兼职编号" readonly></el-input>
                       </el-form-item>
                   </div>
               </el-col>
                <el-col :span="12">
                    <el-form-item class="upload" v-if="type!='info' && !ro.jianzhiPhoto" label="兼职照片" prop="jianzhiPhoto">
                        <file-upload
                            tip="点击上传兼职照片"
                            action="file/upload"
                            :limit="3"
                            :multiple="true"
                            :fileUrls="ruleForm.jianzhiPhoto?$base.url+ruleForm.jianzhiPhoto:''"
                            @change="jianzhiPhotoUploadChange"
                        ></file-upload>
                    </el-form-item>
                    <div v-else>
                        <el-form-item v-if="ruleForm.jianzhiPhoto" label="兼职照片" prop="jianzhiPhoto">
                            <img style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in (ruleForm.jianzhiPhoto || '').split(',')" :src="$base.url+item" width="100" height="100">
                        </el-form-item>
                    </div>
                </el-col>
               <el-col :span="12">
                   <el-form-item class="input" v-if="type!='info'"  label="赞" prop="zanNumber">
                       <el-input v-model="ruleForm.zanNumber"
                                 placeholder="赞" clearable  :readonly="ro.zanNumber"></el-input>
                   </el-form-item>
                   <div v-else-if="type=='info'">
                       <el-form-item class="input" label="赞" prop="zanNumber">
                           <el-input v-model="ruleForm.zanNumber"
                                     placeholder="赞" readonly></el-input>
                       </el-form-item>
                   </div>
               </el-col>
               <el-col :span="12">
                   <el-form-item class="input" v-if="type!='info'"  label="踩" prop="caiNumber">
                       <el-input v-model="ruleForm.caiNumber"
                                 placeholder="踩" clearable  :readonly="ro.caiNumber"></el-input>
                   </el-form-item>
                   <div v-else-if="type=='info'">
                       <el-form-item class="input" label="踩" prop="caiNumber">
                           <el-input v-model="ruleForm.caiNumber"
                                     placeholder="踩" readonly></el-input>
                       </el-form-item>
                   </div>
               </el-col>
                <el-col :span="12">
                    <el-form-item class="select" v-if="type!='info'"  label="兼职类型" prop="jianzhiTypes">
                        <el-select v-model="ruleForm.jianzhiTypes" :disabled="ro.jianzhiTypes" placeholder="请选择兼职类型">
                            <el-option
                                v-for="(item,index) in jianzhiTypesOptions"
                                v-bind:key="item.codeIndex"
                                :label="item.indexName"
                                :value="item.codeIndex">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div v-else-if="type=='info'">
                        <el-form-item class="input" label="兼职类型" prop="jianzhiValue">
                        <el-input v-model="ruleForm.jianzhiValue"
                            placeholder="兼职类型" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="select" v-if="type!='info'"  label="结算类型" prop="jianzhiJiesuanTypes">
                        <el-select v-model="ruleForm.jianzhiJiesuanTypes" :disabled="ro.jianzhiJiesuanTypes" placeholder="请选择结算类型">
                            <el-option
                                v-for="(item,index) in jianzhiJiesuanTypesOptions"
                                v-bind:key="item.codeIndex"
                                :label="item.indexName"
                                :value="item.codeIndex">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div v-else-if="type=='info'">
                        <el-form-item class="input" label="结算类型" prop="jianzhiJiesuanValue">
                        <el-input v-model="ruleForm.jianzhiJiesuanValue"
                            placeholder="结算类型" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
               <el-col :span="12">
                   <el-form-item class="input" v-if="type!='info'"  label="招聘人数" prop="jianzhiKucunNumber">
                       <el-input v-model="ruleForm.jianzhiKucunNumber"
                                 placeholder="招聘人数" clearable  :readonly="ro.jianzhiKucunNumber"></el-input>
                   </el-form-item>
                   <div v-else-if="type=='info'">
                       <el-form-item class="input" label="招聘人数" prop="jianzhiKucunNumber">
                           <el-input v-model="ruleForm.jianzhiKucunNumber"
                                     placeholder="招聘人数" readonly></el-input>
                       </el-form-item>
                   </div>
               </el-col>
               <el-col :span="12">
                   <el-form-item class="input" v-if="type!='info'"  label="联系方式" prop="jianzhiPhone">
                       <el-input v-model="ruleForm.jianzhiPhone"
                                 placeholder="联系方式" clearable  :readonly="ro.jianzhiPhone"></el-input>
                   </el-form-item>
                   <div v-else-if="type=='info'">
                       <el-form-item class="input" label="联系方式" prop="jianzhiPhone">
                           <el-input v-model="ruleForm.jianzhiPhone"
                                     placeholder="联系方式" readonly></el-input>
                       </el-form-item>
                   </div>
               </el-col>
               <el-col :span="12">
                   <el-form-item class="input" v-if="type!='info'"  label="工作地点" prop="jianzhiAddress">
                       <el-input v-model="ruleForm.jianzhiAddress"
                                 placeholder="工作地点" clearable  :readonly="ro.jianzhiAddress"></el-input>
                   </el-form-item>
                   <div v-else-if="type=='info'">
                       <el-form-item class="input" label="工作地点" prop="jianzhiAddress">
                           <el-input v-model="ruleForm.jianzhiAddress"
                                     placeholder="工作地点" readonly></el-input>
                       </el-form-item>
                   </div>
               </el-col>
               <el-col :span="12">
                   <el-form-item class="input" v-if="type!='info'"  label="工作时间" prop="jianzhiShijian">
                       <el-input v-model="ruleForm.jianzhiShijian"
                                 placeholder="工作时间" clearable  :readonly="ro.jianzhiShijian"></el-input>
                   </el-form-item>
                   <div v-else-if="type=='info'">
                       <el-form-item class="input" label="工作时间" prop="jianzhiShijian">
                           <el-input v-model="ruleForm.jianzhiShijian"
                                     placeholder="工作时间" readonly></el-input>
                       </el-form-item>
                   </div>
               </el-col>
               <el-col :span="12">
                   <el-form-item class="input" v-if="type!='info'"  label="薪资/小时" prop="jianzhiDaiyu">
                       <el-input v-model="ruleForm.jianzhiDaiyu"
                                 placeholder="薪资/小时" clearable  :readonly="ro.jianzhiDaiyu"></el-input>
                   </el-form-item>
                   <div v-else-if="type=='info'">
                       <el-form-item class="input" label="薪资/小时" prop="jianzhiDaiyu">
                           <el-input v-model="ruleForm.jianzhiDaiyu"
                                     placeholder="薪资/小时" readonly></el-input>
                       </el-form-item>
                   </div>
               </el-col>
                <el-col :span="24">
                    <el-form-item v-if="type!='info'"  label="工作内容介绍" prop="jianzhiContent">
                        <editor style="min-width: 200px; max-width: 600px;"
                                v-model="ruleForm.jianzhiContent"
                                class="editor"
                                action="file/upload">
                        </editor>
                    </el-form-item>
                    <div v-else-if="type=='info'">
                        <el-form-item v-if="ruleForm.jianzhiContent" label="工作内容介绍" prop="jianzhiContent">
                            <span v-html="ruleForm.jianzhiContent"></span>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-form-item class="btn">
                <el-button v-if="type!='info'" type="primary" class="btn-success" @click="onSubmit">提交</el-button>
                <el-button v-if="type!='info'" class="btn-close" @click="back()">取消</el-button>
                <el-button v-if="type=='info'" class="btn-close" @click="back()">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import styleJs from "../../../utils/style.js";
    // 数字，邮件，手机，url，身份证校验
    import { isNumber,isIntNumer,isEmail,isPhone, isMobile,isURL,checkIdCard } from "@/utils/validate";
    import utilsJs, {getYearFormat,getMonthFormat,getDateFormat,getDatetimeFormat} from "../../../utils/utils.js";
    export default {
        data() {
            return {
                addEditForm:null,
                id: '',
                type: '',
                sessionTable : "",//登录账户所在表名
                role : "",//权限
                userId:"",//当前登录人的id
                shangjiaForm: {},
                ro:{
                    shangjiaId: false,
                    jianzhiName: false,
                    jianzhiUuidNumber: false,
                    jianzhiPhoto: false,
                    zanNumber: false,
                    caiNumber: false,
                    jianzhiTypes: false,
                    jianzhiJiesuanTypes: false,
                    jianzhiKucunNumber: false,
                    jianzhiPhone: false,
                    jianzhiAddress: false,
                    jianzhiShijian: false,
                    jianzhiDaiyu: false,
                    jianzhiContent: false,
                    jianzhiDelete: false,
                    insertTime: false,
                },
                ruleForm: {
                    shangjiaId: '',
                    jianzhiName: '',
                    jianzhiUuidNumber: new Date().getTime(),
                    jianzhiPhoto: '',
                    zanNumber: '',
                    caiNumber: '',
                    jianzhiTypes: '',
                    jianzhiJiesuanTypes: '',
                    jianzhiKucunNumber: '',
                    jianzhiPhone: '',
                    jianzhiAddress: '',
                    jianzhiShijian: '',
                    jianzhiDaiyu: '',
                    jianzhiContent: '',
                    jianzhiDelete: '',
                    insertTime: '',
                },
                jianzhiTypesOptions : [],
                jianzhiJiesuanTypesOptions : [],
                shangjiaOptions : [],
                rules: {
                   shangjiaId: [
                              { required: true, message: '商家不能为空', trigger: 'blur' },
                              {  pattern: /^[0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                   jianzhiName: [
                              { required: true, message: '兼职名称不能为空', trigger: 'blur' },
                          ],
                   jianzhiUuidNumber: [
                              { required: true, message: '兼职编号不能为空', trigger: 'blur' },
                          ],
                   jianzhiPhoto: [
                              { required: true, message: '兼职照片不能为空', trigger: 'blur' },
                          ],
                   zanNumber: [
                              { required: true, message: '赞不能为空', trigger: 'blur' },
                              {  pattern: /^[0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                   caiNumber: [
                              { required: true, message: '踩不能为空', trigger: 'blur' },
                              {  pattern: /^[0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                   jianzhiTypes: [
                              { required: true, message: '兼职类型不能为空', trigger: 'blur' },
                              {  pattern: /^[0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                   jianzhiJiesuanTypes: [
                              { required: true, message: '结算类型不能为空', trigger: 'blur' },
                              {  pattern: /^[0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                   jianzhiKucunNumber: [
                              { required: true, message: '招聘人数不能为空', trigger: 'blur' },
                              {  pattern: /^[0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                   jianzhiPhone: [
                              {  required: true, message: '联系方式不能为空', trigger: 'blur' },
                              {  pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                                 message: '联系方式格式不对',
                                 trigger: 'blur'
                              }
                          ],
                   jianzhiAddress: [
                              { required: true, message: '工作地点不能为空', trigger: 'blur' },
                          ],
                   jianzhiShijian: [
                              { required: true, message: '工作时间不能为空', trigger: 'blur' },
                          ],
                   jianzhiDaiyu: [
                              { required: true, message: '薪资/小时不能为空', trigger: 'blur' },
                          ],
                   jianzhiContent: [
                              { required: true, message: '工作内容介绍不能为空', trigger: 'blur' },
                          ],
                   jianzhiDelete: [
                              { required: true, message: '逻辑删除不能为空', trigger: 'blur' },
                              {  pattern: /^[0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                   insertTime: [
                              { required: true, message: '录入时间不能为空', trigger: 'blur' },
                          ],
                }
            };
        },
        props: ["parent"],
        computed: {
        },
        created() {
            //获取当前登录用户的信息
            this.sessionTable = this.$storage.get("sessionTable");
            this.role = this.$storage.get("role");
            this.userId = this.$storage.get("userId");


            if (this.role != "管理员"){
            }
            this.addEditForm = styleJs.addStyle();
            this.addEditStyleChange()
            this.addEditUploadStyleChange()
            //获取下拉框信息
                this.$http({
                    url:`dictionary/page?page=1&limit=100&sort=&order=&dicCode=jianzhi_types`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.jianzhiTypesOptions = data.data.list;
                    }
                });
                this.$http({
                    url:`dictionary/page?page=1&limit=100&sort=&order=&dicCode=jianzhi_jiesuan_types`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.jianzhiJiesuanTypesOptions = data.data.list;
                    }
                });

         this.$http({
             url: `shangjia/page?page=1&limit=100`,
             method: "get"
         }).then(({ data }) => {
             if (data && data.code === 0) {
                this.shangjiaOptions = data.data.list;
            }
         });

        },
        mounted() {
        },
        methods: {
            // 下载
            download(file){
                window.open(`${file}`)
            },
            // 初始化
            init(id,type) {
                if (id) {
                    this.id = id;
                    this.type = type;
                }
                if(this.type=='info'||this.type=='else'){
                    this.info(id);
                }
                // 获取用户信息
                this.$http({
                    url:`${this.$storage.get("sessionTable")}/session`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        var json = data.data;
                    } else {
                        this.$message.error(data.msg);
                    }
                });
            },
            shangjiaChange(id){
                this.$http({
                    url: `shangjia/info/`+id,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.shangjiaForm = data.data;
                    }
                });
            },
            // 多级联动参数
            info(id) {
                let _this =this;
                _this.$http({
                    url: `jianzhi/info/${id}`,
                    method: 'get'
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        _this.ruleForm = data.data;
                        _this.shangjiaChange(data.data.shangjiaId)
                        _this.ruleForm.jianzhiContent = _this.ruleForm.jianzhiContent.replaceAll("src=\"upload/","src=\""+this.$base.url+"upload/");
                    } else {
                        _this.$message.error(data.msg);
                    }
                });
            },
            // 提交
            onSubmit() {
                this.$refs["ruleForm"].validate(valid => {
                    if (valid) {
                        this.ruleForm.jianzhiContent = this.ruleForm.jianzhiContent.replaceAll(this.$base.url,"");
                        this.$http({
                            url:`jianzhi/${!this.ruleForm.id ? "save" : "update"}`,
                            method: "post",
                            data: this.ruleForm
                        }).then(({ data }) => {
                            if (data && data.code === 0) {
                                this.$message({
                                    message: "操作成功",
                                    type: "success",
                                    duration: 1500,
                                    onClose: () => {
                                        this.parent.showFlag = true;
                                        this.parent.addOrUpdateFlag = false;
                                        this.parent.jianzhiCrossAddOrUpdateFlag = false;
                                        this.parent.search();
                                        this.parent.contentStyleChange();
                                    }
                                });
                            } else {
                                this.$message.error(data.msg);
                            }
                        });
                    }
                });
            },
            // 获取uuid
            getUUID () {
                return new Date().getTime();
            },
            // 返回
            back() {
                this.parent.showFlag = true;
                this.parent.addOrUpdateFlag = false;
                this.parent.jianzhiCrossAddOrUpdateFlag = false;
                this.parent.contentStyleChange();
            },
            //图片
            jianzhiPhotoUploadChange(fileUrls){
                this.ruleForm.jianzhiPhoto = fileUrls;
                this.addEditUploadStyleChange()
            },

            addEditStyleChange() {
                this.$nextTick(()=>{
                    // input
                    document.querySelectorAll('.addEdit-block .input .el-input__inner').forEach(el=>{
                        el.style.height = this.addEditForm.inputHeight
                        el.style.color = this.addEditForm.inputFontColor
                        el.style.fontSize = this.addEditForm.inputFontSize
                        el.style.borderWidth = this.addEditForm.inputBorderWidth
                        el.style.borderStyle = this.addEditForm.inputBorderStyle
                        el.style.borderColor = this.addEditForm.inputBorderColor
                        el.style.borderRadius = this.addEditForm.inputBorderRadius
                        el.style.backgroundColor = this.addEditForm.inputBgColor
                    })
                    document.querySelectorAll('.addEdit-block .input .el-form-item__label').forEach(el=>{
                        el.style.lineHeight = this.addEditForm.inputHeight
                        el.style.color = this.addEditForm.inputLableColor
                        el.style.fontSize = this.addEditForm.inputLableFontSize
                    })
                    // select
                    document.querySelectorAll('.addEdit-block .select .el-input__inner').forEach(el=>{
                        el.style.height = this.addEditForm.selectHeight
                        el.style.color = this.addEditForm.selectFontColor
                        el.style.fontSize = this.addEditForm.selectFontSize
                        el.style.borderWidth = this.addEditForm.selectBorderWidth
                        el.style.borderStyle = this.addEditForm.selectBorderStyle
                        el.style.borderColor = this.addEditForm.selectBorderColor
                        el.style.borderRadius = this.addEditForm.selectBorderRadius
                        el.style.backgroundColor = this.addEditForm.selectBgColor
                    })
                    document.querySelectorAll('.addEdit-block .select .el-form-item__label').forEach(el=>{
                        el.style.lineHeight = this.addEditForm.selectHeight
                        el.style.color = this.addEditForm.selectLableColor
                        el.style.fontSize = this.addEditForm.selectLableFontSize
                    })
                    document.querySelectorAll('.addEdit-block .select .el-select__caret').forEach(el=>{
                        el.style.color = this.addEditForm.selectIconFontColor
                        el.style.fontSize = this.addEditForm.selectIconFontSize
                    })
                    // date
                    document.querySelectorAll('.addEdit-block .date .el-input__inner').forEach(el=>{
                        el.style.height = this.addEditForm.dateHeight
                        el.style.color = this.addEditForm.dateFontColor
                        el.style.fontSize = this.addEditForm.dateFontSize
                        el.style.borderWidth = this.addEditForm.dateBorderWidth
                        el.style.borderStyle = this.addEditForm.dateBorderStyle
                        el.style.borderColor = this.addEditForm.dateBorderColor
                        el.style.borderRadius = this.addEditForm.dateBorderRadius
                        el.style.backgroundColor = this.addEditForm.dateBgColor
                    })
                    document.querySelectorAll('.addEdit-block .date .el-form-item__label').forEach(el=>{
                        el.style.lineHeight = this.addEditForm.dateHeight
                        el.style.color = this.addEditForm.dateLableColor
                        el.style.fontSize = this.addEditForm.dateLableFontSize
                    })
                    document.querySelectorAll('.addEdit-block .date .el-input__icon').forEach(el=>{
                        el.style.color = this.addEditForm.dateIconFontColor
                        el.style.fontSize = this.addEditForm.dateIconFontSize
                        el.style.lineHeight = this.addEditForm.dateHeight
                    })
                    // upload
                    let iconLineHeight = parseInt(this.addEditForm.uploadHeight) - parseInt(this.addEditForm.uploadBorderWidth) * 2 + 'px'
                    document.querySelectorAll('.addEdit-block .upload .el-upload--picture-card').forEach(el=>{
                        el.style.width = this.addEditForm.uploadHeight
                        el.style.height = this.addEditForm.uploadHeight
                        el.style.borderWidth = this.addEditForm.uploadBorderWidth
                        el.style.borderStyle = this.addEditForm.uploadBorderStyle
                        el.style.borderColor = this.addEditForm.uploadBorderColor
                        el.style.borderRadius = this.addEditForm.uploadBorderRadius
                        el.style.backgroundColor = this.addEditForm.uploadBgColor
                    })
                    document.querySelectorAll('.addEdit-block .upload .el-form-item__label').forEach(el=>{
                        el.style.lineHeight = this.addEditForm.uploadHeight
                        el.style.color = this.addEditForm.uploadLableColor
                        el.style.fontSize = this.addEditForm.uploadLableFontSize
                    })
                    document.querySelectorAll('.addEdit-block .upload .el-icon-plus').forEach(el=>{
                        el.style.color = this.addEditForm.uploadIconFontColor
                        el.style.fontSize = this.addEditForm.uploadIconFontSize
                        el.style.lineHeight = iconLineHeight
                        el.style.display = 'block'
                    })
                    // 多文本输入框
                    document.querySelectorAll('.addEdit-block .textarea .el-textarea__inner').forEach(el=>{
                        el.style.height = this.addEditForm.textareaHeight
                        el.style.color = this.addEditForm.textareaFontColor
                        el.style.fontSize = this.addEditForm.textareaFontSize
                        el.style.borderWidth = this.addEditForm.textareaBorderWidth
                        el.style.borderStyle = this.addEditForm.textareaBorderStyle
                        el.style.borderColor = this.addEditForm.textareaBorderColor
                        el.style.borderRadius = this.addEditForm.textareaBorderRadius
                        el.style.backgroundColor = this.addEditForm.textareaBgColor
                    })
                    document.querySelectorAll('.addEdit-block .textarea .el-form-item__label').forEach(el=>{
                        // el.style.lineHeight = this.addEditForm.textareaHeight
                        el.style.color = this.addEditForm.textareaLableColor
                        el.style.fontSize = this.addEditForm.textareaLableFontSize
                    })
                    // 保存
                    document.querySelectorAll('.addEdit-block .btn .btn-success').forEach(el=>{
                        el.style.width = this.addEditForm.btnSaveWidth
                        el.style.height = this.addEditForm.btnSaveHeight
                        el.style.color = this.addEditForm.btnSaveFontColor
                        el.style.fontSize = this.addEditForm.btnSaveFontSize
                        el.style.borderWidth = this.addEditForm.btnSaveBorderWidth
                        el.style.borderStyle = this.addEditForm.btnSaveBorderStyle
                        el.style.borderColor = this.addEditForm.btnSaveBorderColor
                        el.style.borderRadius = this.addEditForm.btnSaveBorderRadius
                        el.style.backgroundColor = this.addEditForm.btnSaveBgColor
                    })
                    // 返回
                    document.querySelectorAll('.addEdit-block .btn .btn-close').forEach(el=>{
                        el.style.width = this.addEditForm.btnCancelWidth
                        el.style.height = this.addEditForm.btnCancelHeight
                        el.style.color = this.addEditForm.btnCancelFontColor
                        el.style.fontSize = this.addEditForm.btnCancelFontSize
                        el.style.borderWidth = this.addEditForm.btnCancelBorderWidth
                        el.style.borderStyle = this.addEditForm.btnCancelBorderStyle
                        el.style.borderColor = this.addEditForm.btnCancelBorderColor
                        el.style.borderRadius = this.addEditForm.btnCancelBorderRadius
                        el.style.backgroundColor = this.addEditForm.btnCancelBgColor
                    })
                })
            },
            addEditUploadStyleChange() {
                this.$nextTick(()=>{
                    document.querySelectorAll('.addEdit-block .upload .el-upload-list--picture-card .el-upload-list__item').forEach(el=>{
                        el.style.width = this.addEditForm.uploadHeight
                        el.style.height = this.addEditForm.uploadHeight
                        el.style.borderWidth = this.addEditForm.uploadBorderWidth
                        el.style.borderStyle = this.addEditForm.uploadBorderStyle
                        el.style.borderColor = this.addEditForm.uploadBorderColor
                        el.style.borderRadius = this.addEditForm.uploadBorderRadius
                        el.style.backgroundColor = this.addEditForm.uploadBgColor
                    })
                })
            },
        }
    };
</script>
<style lang="scss">
.editor{
  height: 500px;

  & /deep/ .ql-container {
	  height: 310px;
  }
}
.amap-wrapper {
  width: 100%;
  height: 500px;
}
.search-box {
  position: absolute;
}
.addEdit-block {
	margin: -10px;
}
.detail-form-content {
	padding: 12px;
}
.btn .el-button {
  padding: 0;
}</style>


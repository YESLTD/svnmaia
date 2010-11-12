var offsetX = 10;                  //�Զ���X����ƫ����
var offsetY = 0;                   //�Զ���Y����ƫ����
var indiv=0;
var loadingInfo = "���ڼ��ء���";   //���ع�����ʾ��Ϣ
var tipDiv;                         //��������ʾ��Ϣ��div����
var currKeyword;                    //��ǰ���ڼ��ص�keyword

var xmlHttp;                        //���ڱ���XMLHttpRequest�����ȫ�ֱ���
var tipCache = new Array();         //���ڻ�����ʾ��Ϣ������

//�ؼ��ʵ�ֱ�ӵ��ú�����ڣ�������ʾ��ʾ��Ϣ
function showTip(keyword, srcObj) {
    currKeyword = keyword;                      //�������keyword�洢����ǰ�ؼ��ʱ�����

    //��������ʾ��Ϣ��div������δ�������򴴽�һ���µ�div����
    if(!tipDiv) {
        tipDiv = document.createElement("div"); //�����µ�div����
        tipDiv.style.position = "absolute";     //��div�Ķ�λ��ʽ����Ϊ���Զ�λ
        tipDiv.id = "tipDiv";                   //������div��idֵ����
        tipDiv.setAttribute("onmouseover","nohide()");//Firefox�����
        if(navigator.userAgent.indexOf("MSIE")>0) 
           tipDiv.attachEvent("onmouseover",nohide);//IE�����
        tipDiv.setAttribute("onmouseout","hide()");
        if(navigator.userAgent.indexOf("MSIE")>0) 
           tipDiv.attachEvent("onmouseout",hide);
        //tipDiv.onmouseout="hide()";
        document.body.appendChild(tipDiv);      //��ҳ����׷�Ӹö���
    }

    locateTip(srcObj);                          //���ݹؼ���λ��ȷ����ϸ��Ϣ����ʾλ��
    loadTip(keyword);                           //���ݹؼ��ʱ�ʶ������ϸ��Ϣ
    tipDiv.style.display = "block";             //���ö������ʾ״̬Ϊ����ʾ��
}

//���ݹؼ���λ��ȷ����ϸ��Ϣ����ʾλ��
function locateTip(srcObj) {
    var tipLeft = srcObj.offsetLeft + srcObj.offsetWidth + offsetX; //ȷ����߾�
    var tipTop = srcObj.offsetTop + offsetY;    //ȷ���ұ߾�

    tipDiv.style.left = tipLeft + "px";         //�趨��߾࣬��λΪ����
    tipDiv.style.top = tipTop + "px";           //�趨�ұ߾࣬��λΪ����
}

//������ϸ��Ϣ
function hideTip1() {
	if(indiv==0){
    tipDiv.style.display = "none";
  }
}
function hide() {
	  indiv=0;
    tipDiv.style.display = "none";
}
function hideTip() {
    setTimeout("hideTip1()",300);
}
function nohide()
{
	indiv=1;
	tipDiv.style.display = "block";
}

//����ϸ��Ϣ�ľ�������д��tipDiv��
function displayTip(content, isLoading) {
    tipDiv.innerHTML = content;                 //������д��tipDiv

    //����Ϣ���Ǽ��ع��̵���ʾ��Ϣʱ������ȡ�Ľ��д�뻺������
    if (!isLoading) {
        tipCache[currKeyword] = content;
    }
}

//���ڴ���XMLHttpRequest����
function createXmlHttp() {
    //����window.XMLHttpRequest�����Ƿ����ʹ�ò�ͬ�Ĵ�����ʽ
    if (window.XMLHttpRequest) {
       xmlHttp = new XMLHttpRequest();                  //FireFox��Opera�������֧�ֵĴ�����ʽ
    } else {
       xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");//IE�����֧�ֵĴ�����ʽ
    }
}

//�ӷ��������عؼ��ʵ���ϸ��Ϣ
function loadTip(currKeyword) {
    //��������д�����Ҫ���صĹؼ�����ϸ��Ϣ��ֱ�Ӵӻ����ȡ
    if(tipCache[currKeyword]){
        tipDiv.innerHTML = tipCache[currKeyword];
        return;                                     //�ӻ����ȡ����ֹ��������
    }
    displayTip(loadingInfo, true);                  //��ʾ�����ڼ��ء�������ʾ��Ϣ

    createXmlHttp();                                //����XMLHttpRequest����
    xmlHttp.onreadystatechange = loadTipCallBack;   //���ûص�����
    xmlHttp.open("GET", "../priv/viewpriv.php?u=" + currKeyword, true);
    xmlHttp.send(null);
}

//��ȡ��ѯѡ��Ļص�����
function loadTipCallBack() {
    if (xmlHttp.readyState == 4) {
        displayTip(xmlHttp.responseText);           //��ʾ������ϵ���ϸ��Ϣ
    }
}

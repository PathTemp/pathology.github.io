if ($_GET) {
    require_once('classes/CMySQL.php');
    switch ($_GET['action']) {
        case 'getMembersAjx':
            getMembersAjx();
            break;
        case 'updateMemberAjx':
            updateMemberAjx();
            break;
        case 'deleteMember':
            deleteMember();
            break;
    }
    exit;
}

function getMembersAjx() {

    // SQL limit
    $sLimit = '';
    if (isset($_GET['iDisplayStart']) && $_GET['iDisplayLength'] != '-1') {
        $sLimit = 'LIMIT ' . (int)$_GET['iDisplayStart'] . ', ' . (int)$_GET['iDisplayLength'];
    }

    // SQL order
    $aColumns = array('first_name', 'last_name', 'email', 'status', 'role', 'date_reg');
    $sOrder = '';
    if (isset($_GET['iSortCol_0'])) {
        $sOrder = 'ORDER BY  ';
        for ($i=0 ; $i<(int)$_GET['iSortingCols'] ; $i++) {
            if ( $_GET[ 'bSortable_'.(int)$_GET['iSortCol_'.$i] ] == 'true' ) {
                $sOrder .= '`'.$aColumns[ (int)$_GET['iSortCol_'.$i] ].'` '.
                    ($_GET['sSortDir_'.$i]==='asc' ? 'asc' : 'desc') .', ';
            }
        }

        $sOrder = substr_replace($sOrder, '', -2);
        if ($sOrder == 'ORDER BY') {
            $sOrder = '';
        }
    }

    // SQL where
    $sWhere = 'WHERE 1';
    if (isset($_GET['sSearch']) && $_GET['sSearch'] != '') {
        $sWhere = 'WHERE 1 AND (';
        for ($i=0; $i<count($aColumns) ; $i++) {
            if (isset($_GET['bSearchable_'.$i]) && $_GET['bSearchable_'.$i] == 'true') {
                $sWhere .= '`' . $aColumns[$i]."` LIKE '%".mysql_real_escape_string($_GET['sSearch'])."%' OR ";
            }
        }
        $sWhere = substr_replace( $sWhere, '', -3 );
        $sWhere .= ')';
    }

    $aMembers = $GLOBALS['MySQL']->getAll("SELECT * FROM `pd_profiles` {$sWhere} {$sOrder} {$sLimit}");
    $iCnt = (int)$GLOBALS['MySQL']->getOne("SELECT COUNT(`id`) AS 'Cnt' FROM `pd_profiles` WHERE 1");

    $output = array(
        'sEcho' => intval($_GET['sEcho']),
        'iTotalRecords' => count($aMembers),
        'iTotalDisplayRecords' => $iCnt,
        'aaData' => array()
    );
    foreach ($aMembers as $iID => $aInfo) {
        $aItem = array(
            $aInfo['first_name'], $aInfo['last_name'], $aInfo['email'], $aInfo['status'], $aInfo['role'], $aInfo['date_reg'], 'DT_RowId' => $aInfo['id']
        );
        $output['aaData'][] = $aItem;
    }
    echo json_encode($output);
}
function updateMemberAjx() {
    $sVal = $GLOBALS['MySQL']->escape($_POST['value']);

    $iId = (int)$_POST['id'];
    if ($iId && $sVal !== FALSE) {
        switch ($_POST['columnName']) {
            case 'first_name':
                $GLOBALS['MySQL']->res("UPDATE `pd_profiles` SET `first_name`='{$sVal}' WHERE `id`='{$iId}'");
                break;
            case 'last_name':
                $GLOBALS['MySQL']->res("UPDATE `pd_profiles` SET `last_name`='{$sVal}' WHERE `id`='{$iId}'");
                break;
            case 'email':
                $GLOBALS['MySQL']->res("UPDATE `pd_profiles` SET `email`='{$sVal}' WHERE `id`='{$iId}'");
                break;
            case 'status':
                $GLOBALS['MySQL']->res("UPDATE `pd_profiles` SET `status`='{$sVal}' WHERE `id`='{$iId}'");
                break;
            case 'role':
                $GLOBALS['MySQL']->res("UPDATE `pd_profiles` SET `role`='{$sVal}' WHERE `id`='{$iId}'");
                break;
            case 'date_reg':
                $GLOBALS['MySQL']->res("UPDATE `pd_profiles` SET `date_reg`='{$sVal}' WHERE `id`='{$iId}'");
                break;
        }
        echo 'Successfully saved';
    }
    exit;
}
function deleteMember() {
    $iId = (int)$_POST['id'];
    if ($iId) {
        $GLOBALS['MySQL']->res("DELETE FROM `pd_profiles` WHERE `id`='{$iId}'");
        return;
    }
    echo 'Error';exit;
}

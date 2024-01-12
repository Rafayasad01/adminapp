const AppUserPromotionTab = () => {
    return (
        <>
            <div className="mt-3 grid grid-cols-none">
                <table className="table-border table-auto">
                    <thead>
                        <tr>
                            <th>Voucher Code</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Postal Code</th>
                            <th>Loyalty Coins</th>
                            <th>User Type</th>
                            <th>Status</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {list &&
                            list.map((item: any, index: number) => {
                                return (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="avatar flex flex-row items-center">
                                                {item.avatar ? (
                                                    <img src={item.avatar} alt="" />
                                                ) : (
                                                    <Avatar
                                                        className="avatar flex flex-row items-center"
                                                        sx={{
                                                            bgcolor: '#1D1D1D',
                                                            width: 35,
                                                            height: 35,
                                                            textTransform: 'uppercase',
                                                            fontSize: '14px',
                                                            marginRight: '10px',
                                                        }}
                                                    >
                                                        {item.firstName?.charAt(0)}
                                                        {item.lastName?.charAt(0)}
                                                    </Avatar>
                                                )}

                                                <div className="flex flex-col items-start justify-start">
                                                    <span className="text-sm font-semibold">
                                                        {`${item.firstName} ${item.lastName}`}
                                                    </span>
                                                    <span className="text-xs font-normal text-[#6A6A6A]">
                                                        {dayjs(item.createdDate).isValid()
                                                            ? dayjs(item.createdDate)?.format(
                                                                'MMMM DD, YYYY'
                                                            )
                                                            : '--'}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.postalCode ? item.postalCode : '--'}</td>
                                        <td><span className='font-bold'>{item.loyaltyCoins}</span></td>
                                        <td>{item.userType}</td>
                                        <td>
                                            {item.isActive ? (
                                                <span className="badge badge-success">ACTIVE</span>
                                            ) : (
                                                <span className="badge badge-danger">INACTIVE</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="flex flex-row-reverse">
                                                <IconButton
                                                    className="btn-dot"
                                                    aria-label="more"
                                                    id="long-button"
                                                    aria-controls={
                                                        actionMenuOpen ? 'long-menu' : undefined
                                                    }
                                                    aria-expanded={
                                                        actionMenuOpen ? 'true' : undefined
                                                    }
                                                    aria-haspopup="true"
                                                    onClick={(
                                                        event: React.MouseEvent<HTMLElement>
                                                    ) => {
                                                        setActionMenuItemid(list[index]);
                                                        setActionMenuAnchorEl(event.currentTarget);
                                                    }}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Switch
                                                    checked={item.isActive}
                                                    onChange={(
                                                        event: React.ChangeEvent<HTMLInputElement>
                                                    ) => handleSwitchChange(event, list[index].id)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody> */}
                </table>
            </div>
            {/* {list?.length < 1 ? (
                <CustomText noroundedborders text="No Records Found" />
            ) : null}
            <TablePagination
                component="div"
                count={total}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {actionMenuAnchorEl && (
                <ActionMenu
                    open={actionMenuOpen}
                    anchorEl={actionMenuAnchorEl}
                    setAnchorEl={setActionMenuAnchorEl}
                    options={actionMenuOptions}
                    callback={manuHandler}
                />
            )} */}
        </>
    )
}

export default AppUserPromotionTab;
import React, { useState } from 'react';
import api from '../../lib/api';

// Definition of the user data expected from the admin endpoint
export interface AdminUserRow {
    id: string;
    name: string;
    email: string;
    profile_image: string | null;
    is_admin: boolean;
    plan: string;
    plan_expiry: string | null;
    usage: {
        resume_evaluations: number;
        jd_scans_used: number;
        fix_it_used: number;
    };
    ai_usage?: {
        total_api_calls: number;
        total_input_tokens: number;
        total_output_tokens: number;
        estimated_cost: number;
    };
    created_at: string | null;
    resume_count: number;
    evaluation_count: number;
    bio?: string;
    social_links: any;
    job_preferences: any;
    last_parsed_profile: any;
    plan_limits: {
        jd_scans: number;
        fix_it_uses: number;
        cover_letters: number;
    };
}

interface AdminUsersProps {
    users: AdminUserRow[];
    onRefresh: () => void;
}

const planColors: Record<string, { bg: string, text: string }> = {
    'starter': { bg: '#f1f5f9', text: '#475569' },
    '24_hour_pass': { bg: '#e0f2fe', text: '#0284c7' },
    'season_pass': { bg: '#ecfdf5', text: '#059669' },
    'premium': { bg: '#fef3c7', text: '#d97706' }
};

const planLabels: Record<string, string> = {
    'starter': 'Starter',
    '24_hour_pass': '24 Hour Pass',
    'season_pass': 'Season Pass',
    'premium': 'Premium'
};

export default function AdminUsers({ users, onRefresh }: AdminUsersProps) {
    const [selectedUser, setSelectedUser] = useState<AdminUserRow | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [planForm, setPlanForm] = useState({ plan: 'starter', expiryDate: '' });

    // Restored states
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [selectedUserProfile, setSelectedUserProfile] = useState<AdminUserRow | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState<AdminUserRow | null>(null);

    const openModal = (user: AdminUserRow) => {
        setSelectedUser(user);
        // Pre-fill form
        const defaultDate = user.plan_expiry ? new Date(user.plan_expiry).toISOString().split('T')[0] : '';
        setPlanForm({
            plan: user.plan || 'starter',
            expiryDate: defaultDate
        });
    };

    const closeModal = () => {
        setSelectedUser(null);
    };

    const openProfile = (user: AdminUserRow) => {
        setSelectedUserProfile(user);
        setShowProfileModal(true);
    };

    const openDelete = (user: AdminUserRow) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!userToDelete) return;
        try {
            await api.delete(`/admin/users/${userToDelete.id}`);
            setShowDeleteModal(false);
            onRefresh();
        } catch (err) {
            alert('Delete failed: ' + err);
        }
    };

    const handlePlanSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;

        setIsSubmitting(true);
        try {
            await api.post('/admin/change-plan', {
                user_id: selectedUser.id,
                plan: planForm.plan,
                // Only send expiry if it's set and not empty, otherwise let backend decide defaults
                expiry: planForm.expiryDate ? new Date(planForm.expiryDate).toISOString() : null
            });
            onRefresh();
            closeModal();
        } catch (error) {
            console.error('Failed to update plan:', error);
            alert('Failed to update plan. See console for details.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card" style={{ overflow: 'hidden', background: 'rgba(255, 255, 255, 0.95)', border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1e293b', margin: 0 }}>👥 User SaaS Plans ({users.length})</h3>
                <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>Manage assigning passes and plans to users.</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                            <th style={{ textAlign: 'left', padding: '14px 24px', color: '#64748b', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>User</th>
                            <th style={{ textAlign: 'left', padding: '14px 24px', color: '#64748b', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>Current Plan</th>
                            <th style={{ textAlign: 'left', padding: '14px 24px', color: '#64748b', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>Plan Expiry</th>
                            <th style={{ textAlign: 'center', padding: '14px 24px', color: '#64748b', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>Local Usage (E/S/F)</th>
                            <th style={{ textAlign: 'center', padding: '14px 24px', color: '#64748b', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>AI API Tokens</th>
                            <th style={{ textAlign: 'center', padding: '14px 24px', color: '#64748b', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>AI Est. Cost</th>
                            <th style={{ textAlign: 'right', padding: '14px 24px', color: '#64748b', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => {
                            const colors = planColors[u.plan || 'starter'] || planColors['starter'];
                            const usageStr = `${u.usage?.resume_evaluations || 0} / ${u.usage?.jd_scans_used || 0} / ${u.usage?.fix_it_used || 0}`;
                            
                            return (
                                <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                    <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                        {u.profile_image ? (
                                            <img src={u.profile_image} alt="" style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} />
                                        ) : (
                                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                                                {u.name[0]}
                                            </div>
                                        )}
                                        <div>
                                            <div style={{ fontWeight: 700, color: '#1e293b' }}>{u.name} {u.is_admin && <span style={{ fontSize: 10, background: '#fef3c7', color: '#d97706', padding: '2px 6px', borderRadius: 4, marginLeft: 4 }}>ADMIN</span>}</div>
                                            <div style={{ fontSize: 12, color: '#64748b' }}>{u.email}</div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{ 
                                            background: colors.bg, 
                                            color: colors.text, 
                                            padding: '6px 14px', 
                                            borderRadius: 20, 
                                            fontSize: 12, 
                                            fontWeight: 700,
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                                        }}>
                                            {planLabels[u.plan || 'starter'] || u.plan}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 24px', color: '#475569', fontSize: 13, fontWeight: 500 }}>
                                        {u.plan_expiry ? new Date(u.plan_expiry).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Lifetime / None'}
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                                        <div style={{ background: '#f8fafc', padding: '6px 12px', borderRadius: 8, display: 'inline-block', color: '#475569', fontWeight: 600, border: '1px solid #e2e8f0' }}>
                                            {usageStr}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>
                                            {((u.ai_usage?.total_input_tokens || 0) + (u.ai_usage?.total_output_tokens || 0)).toLocaleString()}
                                        </div>
                                        <div style={{ fontSize: 10, color: '#6366f1', fontWeight: 600 }}>
                                            {u.ai_usage?.total_api_calls || 0} API Calls
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                                        <div style={{ color: '#10b981', fontWeight: 800, fontSize: 13 }}>
                                            ${u.ai_usage?.estimated_cost?.toFixed(4) || '0.0000'}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                                        <button
                                            onClick={() => openProfile(u)}
                                            style={{
                                                padding: '8px 12px', fontSize: 11, fontWeight: 700, color: '#475569',
                                                background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 8, cursor: 'pointer'
                                            }}
                                        >Profile</button>
                                        <button
                                            onClick={() => openModal(u)}
                                            style={{
                                                padding: '8px 12px',
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: '#6366f1',
                                                background: 'rgba(99,102,241,0.1)',
                                                border: '1px solid rgba(99,102,241,0.2)',
                                                borderRadius: 8,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(ev) => { ev.currentTarget.style.background = '#6366f1'; ev.currentTarget.style.color = '#fff'; }}
                                            onMouseLeave={(ev) => { ev.currentTarget.style.background = 'rgba(99,102,241,0.1)'; ev.currentTarget.style.color = '#6366f1'; }}
                                        >
                                            Change Plan
                                        </button>
                                        <button
                                            onClick={() => openDelete(u)}
                                            style={{
                                                padding: '8px 12px', fontSize: 11, fontWeight: 700, color: '#f43f5e',
                                                background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 8, cursor: 'pointer'
                                            }}
                                        >Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* User Profile Modal */}
            {showProfileModal && selectedUserProfile && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(10px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20
                }} onClick={() => setShowProfileModal(false)}>
                    <div
                        style={{
                            background: 'rgba(255, 255, 255, 0.95)', maxWidth: 850, width: '100%',
                            borderRadius: 32, boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.5)', maxHeight: '92vh', overflowY: 'auto',
                            display: 'flex', flexDirection: 'column', position: 'relative'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowProfileModal(false)}
                            style={{ position: 'absolute', top: 24, right: 32, background: '#f1f5f9', border: 'none', width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: 24, fontWeight: 700, zIndex: 10 }}
                        >×</button>

                        <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', padding: '48px 56px', color: '#fff' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                                {selectedUserProfile.profile_image ? (
                                    <img src={selectedUserProfile.profile_image} alt="" style={{ width: 110, height: 110, borderRadius: '50%', border: '4px solid rgba(255,255,255,0.3)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }} />
                                ) : (
                                    <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, fontWeight: 800 }}>
                                        {selectedUserProfile.name[0]}
                                    </div>
                                )}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                                        <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>{selectedUserProfile.name}</h2>
                                        {selectedUserProfile.is_admin && <span style={{ background: '#fef3c7', color: '#d97706', fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 6, letterSpacing: 0.5 }}>ADMIN</span>}
                                    </div>
                                    <p style={{ fontSize: 16, opacity: 0.9, margin: '8px 0' }}>{selectedUserProfile.email}</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '48px 56px', display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: 48, background: '#fff' }}>
                            {/* Left Column */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                                <section>
                                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1e293b', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>📝 Biography</h3>
                                    <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, margin: 0 }}>
                                        {selectedUserProfile.bio || "No biography provided by the user."}
                                    </p>
                                </section>

                                <section>
                                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1e293b', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>🛠️ Skills Profile</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                        {selectedUserProfile.last_parsed_profile?.skills?.map((s: string) => (
                                            <span key={s} style={{ 
                                                background: '#f1f5f9', color: '#6366f1', padding: '8px 16px', 
                                                borderRadius: 12, fontSize: 13, fontWeight: 600, border: '1px solid #e2e8f0'
                                            }}>{s}</span>
                                        )) || <span style={{ color: '#94a3b8', fontSize: 14 }}>No skills extracted</span>}
                                    </div>
                                </section>

                                <section>
                                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1e293b', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>💼 Professional Experience</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                        {selectedUserProfile.last_parsed_profile?.experience?.slice(0, 5).map((exp: string, i: number) => (
                                            <div key={i} style={{ 
                                                fontSize: 14, color: '#475569', background: '#f8fafc', 
                                                padding: '16px 20px', borderRadius: 16, borderLeft: '4px solid #8b5cf6',
                                                lineHeight: 1.6
                                            }}>{exp}</div>
                                        )) || <span style={{ color: '#94a3b8', fontSize: 14 }}>No experience found</span>}
                                    </div>
                                </section>

                                {selectedUserProfile.last_parsed_profile?.education && (
                                    <section>
                                        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1e293b', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>🎓 Education</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                            {selectedUserProfile.last_parsed_profile.education.map((edu: string, i: number) => (
                                                <div key={i} style={{ fontSize: 14, color: '#475569', fontWeight: 600 }}>• {edu}</div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* Right Column */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                                <section style={{ background: '#f8fafc', padding: 24, borderRadius: 24, border: '1px solid #e2e8f0' }}>
                                    <h4 style={{ fontSize: 13, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>Account Activity</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                            <span style={{ color: '#64748b', fontWeight: 500 }}>Total Resumes</span>
                                            <span style={{ fontWeight: 800, color: '#1e293b' }}>{selectedUserProfile.resume_count}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                            <span style={{ color: '#64748b', fontWeight: 500 }}>Evaluations</span>
                                            <span style={{ fontWeight: 800, color: '#1e293b' }}>{selectedUserProfile.evaluation_count}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                            <span style={{ color: '#64748b', fontWeight: 500 }}>Member Since</span>
                                            <span style={{ fontWeight: 800, color: '#1e293b' }}>
                                                {selectedUserProfile.created_at ? new Date(selectedUserProfile.created_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : 'March 2026'}
                                            </span>
                                        </div>
                                    </div>
                                </section>

                                <section style={{ background: 'linear-gradient(to bottom right, #fdf4ff, #fff)', padding: 24, borderRadius: 24, border: '1px solid #fae8ff' }}>
                                    <h4 style={{ fontSize: 13, fontWeight: 800, color: '#a21caf', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>SaaS Usage & Limits</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                            <span style={{ color: '#701a75', fontWeight: 500 }}>JD Scans</span>
                                            <span style={{ fontWeight: 800 }}>{selectedUserProfile.usage?.jd_scans_used || 0} / {selectedUserProfile.plan_limits?.jd_scans || 0}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                            <span style={{ color: '#701a75', fontWeight: 500 }}>Fix-it Uses</span>
                                            <span style={{ fontWeight: 800 }}>{selectedUserProfile.usage?.fix_it_used || 0} / {selectedUserProfile.plan_limits?.fix_it_uses || 0}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                            <span style={{ color: '#701a75', fontWeight: 500 }}>Plan</span>
                                            <span style={{ fontWeight: 800, color: '#a21caf' }}>{planLabels[selectedUserProfile.plan] || selectedUserProfile.plan}</span>
                                        </div>
                                    </div>
                                </section>

                                <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: 24, borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                                    <h4 style={{ fontSize: 13, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>AI Cost Analytics</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                            <span style={{ color: '#94a3b8' }}>API Calls</span>
                                            <span style={{ fontWeight: 700 }}>{selectedUserProfile.ai_usage?.total_api_calls || 0}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                            <span style={{ color: '#94a3b8' }}>Input Tokens</span>
                                            <span style={{ fontWeight: 700 }}>{selectedUserProfile.ai_usage?.total_input_tokens?.toLocaleString() || 0}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                            <span style={{ color: '#94a3b8' }}>Output Tokens</span>
                                            <span style={{ fontWeight: 700 }}>{selectedUserProfile.ai_usage?.total_output_tokens?.toLocaleString() || 0}</span>
                                        </div>
                                        <div style={{ marginTop: 8, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: '#10b981', fontWeight: 700, fontSize: 12 }}>ESTIMATED COST</span>
                                            <span style={{ fontSize: 18, fontWeight: 900, color: '#10b981' }}>${selectedUserProfile.ai_usage?.estimated_cost?.toFixed(4) || '0.0000'}</span>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h4 style={{ fontSize: 13, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Job Preferences</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                        <div>
                                            <label style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: 8 }}>DESIRED ROLES</label>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                                {selectedUserProfile.job_preferences?.desired_roles?.map((r: string) => (
                                                    <span key={r} style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600 }}>{r}</span>
                                                )) || <span style={{ color: '#cbd5e1', fontSize: 12 }}>Not specified</span>}
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: 4 }}>LOCATIONS</label>
                                            <span style={{ fontSize: 14, color: '#475569', fontWeight: 600 }}>{selectedUserProfile.job_preferences?.locations?.join(', ') || 'Remote / Global'}</span>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h4 style={{ fontSize: 13, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>AI Suggested Roles</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                        {selectedUserProfile.last_parsed_profile?.suggested_roles?.map((r: string) => (
                                            <span key={r} style={{ background: '#eff6ff', color: '#2563eb', padding: '6px 12px', borderRadius: 10, fontSize: 12, fontWeight: 700, border: '1px solid #dbeafe' }}>{r}</span>
                                        )) || <span style={{ color: '#cbd5e1', fontSize: 12 }}>No suggestions yet</span>}
                                    </div>
                                </section>
                            </div>
                        </div>

                        <div style={{ padding: '32px 56px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'center', background: '#f8fafc', borderRadius: '0 0 32px 32px' }}>
                            <button
                                onClick={() => setShowProfileModal(false)}
                                style={{
                                    padding: '14px 40px', background: '#1e293b', color: '#fff', 
                                    border: 'none', borderRadius: 16, fontSize: 15, fontWeight: 800, 
                                    cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 10px 20px -5px rgba(30,41,59,0.3)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                Close Profile
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && userToDelete && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: 20
                }} onClick={() => setShowDeleteModal(false)}>
                    <div
                        style={{
                            background: '#fff', maxWidth: 400, width: '100%', borderRadius: 24, padding: 32,
                            textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#fef2f2', color: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 20px' }}>⚠️</div>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: 18, fontWeight: 800, color: '#1e293b' }}>Delete User?</h3>
                        <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5, margin: '0 0 24px 0' }}>Are you sure you want to delete <strong>{userToDelete.name}</strong>? This will permanently remove their profile and all data.</p>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button onClick={() => setShowDeleteModal(false)} style={{ flex: 1, padding: 12, borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                            <button onClick={handleDelete} style={{ flex: 1, padding: 12, borderRadius: 12, border: 'none', background: '#f43f5e', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Change Plan Modal */}
            {selectedUser && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20,
                    animation: 'fadeIn 0.2s ease-out'
                }} onClick={closeModal}>
                    <div
                        style={{
                            background: '#fff', maxWidth: 440, width: '100%',
                            borderRadius: 24, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            display: 'flex', flexDirection: 'column',
                            animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
                            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1e293b', margin: 0 }}>Assign SaaS Plan</h3>
                            <p style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>Modifying plan for <strong>{selectedUser.name}</strong></p>
                        </div>
                        
                        <form onSubmit={handlePlanSubmit} style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontSize: 13, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>Select Plan</label>
                                <select 
                                    value={planForm.plan}
                                    onChange={(e) => setPlanForm({...planForm, plan: e.target.value})}
                                    style={{
                                        padding: '12px 16px', borderRadius: 12, border: '1px solid #cbd5e1',
                                        background: '#f8fafc', fontSize: 15, color: '#1e293b', outline: 'none',
                                        transition: 'border-color 0.2s', appearance: 'none'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                    onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                                >
                                    <option value="starter">Starter (Default Limits)</option>
                                    <option value="24_hour_pass">24 Hour Pass</option>
                                    <option value="season_pass">Season Pass (90 Days)</option>
                                    <option value="premium">Premium (Lifetime/High Limits)</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <label style={{ fontSize: 13, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>Plan Expiry (Optional)</label>
                                <input 
                                    type="date"
                                    value={planForm.expiryDate}
                                    onChange={(e) => setPlanForm({...planForm, expiryDate: e.target.value})}
                                    style={{
                                        padding: '12px 16px', borderRadius: 12, border: '1px solid #cbd5e1',
                                        background: '#f8fafc', fontSize: 15, color: '#1e293b', outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                    onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                                />
                                <span style={{ fontSize: 12, color: '#94a3b8' }}>Leave blank to use default plan duration. Changing plan will reset current usage limits.</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    style={{ padding: '12px 20px', borderRadius: 12, border: 'none', background: '#f1f5f9', color: '#475569', fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#e2e8f0'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = '#f1f5f9'}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{ 
                                        padding: '12px 24px', borderRadius: 12, border: 'none', 
                                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', 
                                        fontSize: 14, fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer', 
                                        boxShadow: '0 4px 14px rgba(99,102,241,0.3)', opacity: isSubmitting ? 0.7 : 1,
                                        transition: 'transform 0.1s'
                                    }}
                                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    {isSubmitting ? 'Updating...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
